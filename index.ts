import express, { Request, Response } from "express";
import { connectDB } from "./src/database/db";
import { userAuth } from "./src/middleware/auth.middleware";
import errorHandler from "./src/middleware/error.middleware";
import authRoutes from "./src/routes/authRoutes";
import userRoutes from "./src/routes/userRoutes";
import companyRoutes from "./src/routes/companyRoutes";

const app = express();

const PORT: number = 3000;

app.get("/", async (req: Request, res: Response) => {});
app.use(express.json());
app.use("/auth", authRoutes);
//Error handler
app.use(userAuth);
//Every route under this userAuth middleware is protected
app.use("/users", userRoutes);
app.use("/companies", companyRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  connectDB();
  console.log("Our TadJobs server is running on PORT: ", PORT);
});
