import { Router } from "express";
import {
  getCompanies,
  getCompany,
  updateCompany,
  addNewCompany,
} from "../controllers/companyController";

const router: Router = Router();

router.get("/:companyID", getCompany);

router.get("/", getCompanies);

router.put("/:companyID", updateCompany);

router.post("/", addNewCompany);

export default router;
