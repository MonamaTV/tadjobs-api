import { Router, Request, Response } from "express";
import {
  getUser,
  deactivateUser,
  updateUser,
} from "../controllers/userController";

const router: Router = Router();

router.get("/", getUser);

router.put("/", updateUser);

router.delete("/", deactivateUser);

export default router;
