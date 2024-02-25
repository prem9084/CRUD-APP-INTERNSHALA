import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

import { comparePassword, hashPassword } from "../utils/authUtiles.js";

export const registerController = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // validation

    if (!fname) {
      return res.send({ message: "Name is Required" });
    }
    if (!lname) {
      return res.send({ message: "Last Nameis Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }

    if (!password) {
      return res.send({ message: "password is Required" });
    }
    // chack user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Register Please Login",
      });
    }

    // register user

    const hashedPassword = await hashPassword(password);
    // save

    const user = await new userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // chek user

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not regitered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    // tokens

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
