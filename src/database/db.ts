import { connect } from "mongoose";
import dotenv from "dotenv";
import { AppError } from "../middleware/error.middleware";

dotenv.config();

export const connectDB = () => {
  try {
    connect(process.env.DB_URI as string, (error) => {
      if (error) throw new AppError(500, "Something terrible happened");

      console.log("We are connected to the database");
    });
  } catch (error) {
    throw new AppError(500, "Something terrible happened");
  }
};
