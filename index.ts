import express, { Request, Response } from "express";
import { connectDB } from "./src/database/db";
import errorHandler from "./src/middleware/error.middleware";
import authRoutes from "./src/routes/authRoutes";
const app = express();

const PORT: number = 3000;

app.get("/", async (req: Request, res: Response) => {});
app.use(express.json());
app.use("/auth", authRoutes);
//Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("Our TadJobs server is running on PORT: ", PORT);
});
