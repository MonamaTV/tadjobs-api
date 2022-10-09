import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";
import { Users } from "../models/User";
import bcrypt from "bcrypt";
import { assignToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.body?.email;
    const password = req.body?.password;
    if (!email || !password) {
      throw new AppError(400, "Email or password is incorrect");
    }

    const user = await Users.findOne({ email: email, active: true });
    if (!user) {
      throw new AppError(400, "User does not exists");
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      throw new AppError(400, "Email or password do not match our records");
    }

    const token = assignToken({ userID: user.id });

    res.status(200).send({
      message: "User now logged in",
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
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

    const token = assignToken({ userID: newUser.id });

    res.status(201).send({
      message: "User is successfully registered",
      success: true,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, email } = req.user;
    const user = await Users.findOne({ _id, email }, { email: 1, name: 1, active: 1 });
    if (!user) {
      throw new AppError(401, "User does not exist");
    }
    res.status(200).send({
      message: "User details",
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, email } = req.user;
    const name = req.body.name;
    if (!name) {
      throw new AppError(400, "No user details to update");
    }
    const updatedUser = await Users.findOneAndUpdate(
      { _id, email, active: true }, //You need to update a user that is active
      {
        name,
      },
      {
        new: true,
      }
    ).select("email name");

    //In case, it failed to find the user to update
    if (!updatedUser) {
      throw new AppError(400, "Failed to update user");
    }

    res.status(200).send({
      data: updatedUser,
      success: true,
      message: "User successfully updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deactivateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, email } = req.user;
    const deactivated = await Users.findOneAndUpdate(
      { _id, email, active: true }, //Deactivate the user that is active
      {
        active: false,
      },
      {
        new: true,
      }
    ).select("email name");

    //In case, the user exists but not active
    if (!deactivated) {
      throw new AppError(400, "No user to deactivate");
    }

    res.status(200).send({
      message: "User deactivated",
      success: true,
      data: deactivated,
    });
  } catch (error) {
    next(error);
  }
};
