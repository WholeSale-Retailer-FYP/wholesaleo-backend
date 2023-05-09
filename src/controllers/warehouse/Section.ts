import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Section from "../../models/warehouse/Section";
// Routes needed:
// Verify section
const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, capacity, warehouseId } = req.body;
  try {
    const section = await Section.create({
      name,
      capacity,
      warehouseId,
    });
    res.status(201).json({ data: section });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId);
    if (!section) {
      throw new Error("Section Not Found");
    }
    res.status(200).json({ data: section });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sections = await Section.find();
    res.status(200).json({ data: sections });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const verifySection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const updatedSection = await Section.updateOne(
      { _id },
      {
        verified: true,
      }
    );
    if (!updatedSection) throw new Error("Section not found!");
    res.status(201).json({ data: updatedSection });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, capacity, warehouseId, currentQuantity } = req.body;
    const updatedSection = await Section.updateOne(
      { _id },
      {
        name,
        capacity,
        warehouseId,
        currentQuantity,
      }
    );
    if (!updatedSection) throw new Error("Section not found!");
    res.status(201).json({ data: updatedSection });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.sectionId;
    const section = await Section.deleteOne({ _id });
    if (!section) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createSection,
  readAllSection,
  readSection,
  verifySection,
  updateSection,
  deleteSection,
};
