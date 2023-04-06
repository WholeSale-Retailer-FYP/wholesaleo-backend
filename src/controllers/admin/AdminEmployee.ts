import { NextFunction, Request, Response } from "express";
import AdminEmployee from "../../models/admin/AdminEmployee";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, role, cnic, provinceId, cityId, regionId } =
    req.body;
  try {
    const adminEmployee = await AdminEmployee.create({
      name,
      email,
      password,
      role,
      cnic,
      provinceId,
      cityId,
      regionId,
    });
    res.status(201).json({ data: adminEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminEmployeeId = req.params.adminEmployeeId;
    const adminEmployee = await AdminEmployee.findById(adminEmployeeId);
    if (adminEmployee) {
      res.status(200).json({ data: adminEmployee });
    }
    throw new Error("AdminEmployee Not Found");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await AdminEmployee.find();
    res.status(200).json({ data: employees });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      _id,
      name,
      email,
      password,
      role,
      cnic,
      provinceId,
      cityId,
      regionId,
    } = req.body;
    const updated = await AdminEmployee.updateOne(
      { _id },
      { name, email, password, role, cnic, provinceId, cityId, regionId }
    );
    if (!updated) throw new Error("AdminEmployee not found!");
    res.status(201).json({ data: updated });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteAdminEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.adminEmployeeId;
    const employee = await AdminEmployee.deleteOne({ _id });
    if (employee.acknowledged && employee.deletedCount == 0)
      throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  create,
  readAll,
  read,
  update,
  deleteAdminEmployee,
};
