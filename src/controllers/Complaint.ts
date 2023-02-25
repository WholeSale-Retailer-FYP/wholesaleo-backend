import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Complaint from "../models/Complaint";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

const createComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, description, retailedId, warehouseId } = req.body;
  try {
    const complaint = await Complaint.create({
      status,
    });
    res.status(201).json({ data: complaint });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaintId = req.params.complaintId;
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      throw new Error("Complaint Not Found");
    }
    res.status(200).json({ data: complaint });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({ data: complaints });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, status, description, retailedId, warehouseId } = req.body;
    const updatedComplaint = await Complaint.updateOne(
      { _id },
      { status, description, retailedId, warehouseId }
    );
    if (!updatedComplaint) throw new Error("Complaint not found!");
    res.status(201).json({ data: updatedComplaint });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.complaintId;
    const complaint = await Complaint.deleteOne({ _id });
    if (!complaint) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createComplaint,
  readAllComplaint,
  readComplaint,
  updateComplaint,
  deleteComplaint,
};
