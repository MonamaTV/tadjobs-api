import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import { assignToken } from "../utils/jwt";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!password || !email) {
      throw new AppError(400, "Email or password is incorrect");
    }

    const user = await Users.findOne({ email: email });
    if (!user) {
      throw new AppError(400, "User does not exists");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new AppError(400, "Email or password do not match our records");
    }

    const token = assignToken(user.id);

    res.status(201).send({
      message: "User now logged in",
      code: 200,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    const name = req.body?.name;
    if (!name || !password || !email) {
      throw new AppError(400, "User provided invalid details");
    }
    //
    const user = await Users.findOne({ email: email });
    if (user) {
      throw new AppError(401, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new AppError(400, "Failed to register a new user. Try again");
    }

    const token = assignToken(newUser.id);

    res.status(201).send({
      message: "User is successfully registered",
      code: 201,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
