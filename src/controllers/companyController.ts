//Get company
import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";
import { Companies } from "../models/Company";

export const getCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyID = req.params.companyID;
    const userID = req.user._id;
    const company = await Companies.find({ _id: companyID, userID });
    if (!company) {
      throw new AppError(404, "Company not found");
    }
    res.status(200).send({
      message: "Company details",
      data: company,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

//Get companies
export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Pagination 2, 2
    const perPage = req.query?.per_page ? parseInt(req.query?.per_page as string) : 10;
    const page = req.query?.page ? parseInt(req.query?.page as string) : 1;
    const userID = req.user._id;
    const companies = await Companies.find({
      userID,
      name: { $regex: "Apple", $options: "i" },
    })
      .limit(perPage)
      .skip((page - 1) * perPage);
    if (!companies) {
      throw new AppError(404, "companies not found");
    }
    res.status(200).send({
      message: "companies details",
      data: companies,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//add new a company
export const addNewCompany = async (req: Request, res: Response, next: NextFunction) => {
  //
  try {
    const userID = req.user._id;
    const newCompany = { ...req.body, userID: userID };
    const saved = await Companies.create(newCompany);
    if (!saved) {
      throw new AppError(400, "Failed to add new company");
    }
    res.status(201).send({
      message: "Company was added",
      data: saved,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
//update company
export const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user._id;
    const companyID = req.params.companyID;
    const company = { ...req.body, userID: userID };
    const updated = await Companies.findOneAndUpdate({ _id: companyID, userID: userID }, company, {
      new: true,
    });
    if (!updated) {
      throw new AppError(400, "Failed to update company");
    }
    res.status(200).send({
      message: "Company was updated",
      data: updated,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
