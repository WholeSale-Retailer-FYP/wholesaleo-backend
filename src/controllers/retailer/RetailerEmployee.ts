import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import RetailerEmployee from "../../models/retailer/RetailerEmployee";
const bcrypt = require("bcrypt");

const DEFAULT_IMG =
  "https://res.cloudinary.com/dca8sskac/image/upload/v1679653632/defaultProfile_ae3kr1.png";

const createRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, cnic, phoneNumber, role, password, retailerId } =
    req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const retailerEmployee = await RetailerEmployee.create({
      firstName,
      lastName,
      cnic,
      phoneNumber,
      role,
      password: hashedPassword,
      retailerId,
      image: DEFAULT_IMG,
    });
    res.status(201).json({ data: retailerEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerEmployeeId = req.params.retailerEmployeeId;
    const retailer = await RetailerEmployee.findById(
      retailerEmployeeId
    ).populate("retailerId", "shopName");

    if (!retailer) {
      res.status(404).json({ message: "Retailer not Found" });
      return;
    }

    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readEmployeesOfSingleRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    const retailer = await RetailerEmployee.find({ retailerId }).populate(
      "retailerId",
      "shopName"
    );

    if (!retailer) {
      res.status(404).json({ message: "Retailer not Found" });
      return;
    }

    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailer = await RetailerEmployee.find().populate(
      "retailerId",
      "shopName"
    );
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const loginRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cnic, password } = req.body;
    const retailerEmployee = await RetailerEmployee.findOne({ cnic }).populate({
      path: "retailerId",
      select: ["shopName", "warehouseId"],
    });

    if (!retailerEmployee)
      throw new Error("Retailer not found! Incorrect CNIC");
    if (await bcrypt.compare(password, retailerEmployee.password)) {
      const data = {
        _id: retailerEmployee._id,
        firstName: retailerEmployee.firstName,
        lastName: retailerEmployee.lastName,
        phoneNumber: retailerEmployee.phoneNumber,
        role: retailerEmployee.role,
        retailerId: retailerEmployee.retailerId,
      };

      // const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret, {
      //   expiresIn: "20s",
      // });
      const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret);

      res.json({
        data,
        token,
      });
    } else throw new Error("Incorrect Password entered");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, firstName, lastName, cnic, phoneNumber, role, retailerId } =
      req.body;

    // check if retailer exists
    const retailerEmployee = await RetailerEmployee.findById(_id);
    if (!retailerEmployee) throw new Error("RetailerEmployee not found!");

    const updatedRetailerEmployee = await RetailerEmployee.updateOne(
      { _id },
      {
        firstName: firstName,
        lastName: lastName,
        cnic: cnic,
        phoneNumber: phoneNumber,
        role: role,
        retailerId: retailerId,
      }
    );

    if (!updatedRetailerEmployee)
      throw new Error("ERROR: Could not update retailer Info!");

    res.status(201).json({ data: updatedRetailerEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, newPassword, oldPassword } = req.body;

    // check if retailer exists
    const retailerEmployee = await RetailerEmployee.findById(_id);
    if (!retailerEmployee) throw new Error("RetailerEmployee not found!");

    //check if old password is correct
    if (await bcrypt.compare(oldPassword, retailerEmployee.password)) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const updatedRetailerEmployee = await RetailerEmployee.updateOne(
        { _id },
        {
          password: hashedPassword,
        }
      );

      if (!updatedRetailerEmployee)
        throw new Error("ERROR: Could not update retailer Info!");

      res.status(201).json({ data: updatedRetailerEmployee });
    } else throw new Error("Incorrect Password entered");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.body;

    const retailerEmployee = await RetailerEmployee.findById(_id);
    if (!retailerEmployee) throw new Error("RetailerEmployee not found!");

    if (!req.file) res.status(500).json({ message: "No image uploaded!" });
    let uploadedFile: UploadApiResponse;

    uploadedFile = await cloudinary.uploader.upload(req.file!.path, {
      resource_type: "auto",
      width: 350,
      height: 350,
    });

    // update image field in retailerExployees
    const updatedRetailerEmployee = await RetailerEmployee.updateOne(
      { _id },
      {
        image: uploadedFile.secure_url,
      }
    );
    if (!updatedRetailerEmployee) throw new Error("Could not update image!");

    // delete previous image from cloudinary if exists and if it is not default image
    if (retailerEmployee.image && retailerEmployee.image !== DEFAULT_IMG) {
      const publicId = retailerEmployee.image.split("/").pop()?.split(".")[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    res.status(201).json({ data: updatedRetailerEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerEmployeeId;
    const warehouse = await RetailerEmployee.deleteOne({ _id });
    if (!warehouse) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerEmployee,
  readAllRetailerEmployee,
  readRetailerEmployee,
  readEmployeesOfSingleRetailer,
  loginRetailerEmployee,
  updateRetailerEmployee,
  updatePassword,
  updateImage,
  deleteRetailerEmployee,
};
