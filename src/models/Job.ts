import { Schema, model, Types } from "mongoose";
import { IJob, ISalaryRange } from "../utils/types";

const salarySchema = new Schema<ISalaryRange>({
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

const jobSchema = new Schema<IJob>(
  {
    salaryRange: {
      type: salarySchema,
      required: true,
    },
    closingDate: {
      type: Date,
      required: true,
    },
    openingDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    companyID: {
      type: Types.ObjectId,
      required: true,
      ref: "companies",
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    seniority: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Jobs = model<IJob>("jobs", jobSchema);
