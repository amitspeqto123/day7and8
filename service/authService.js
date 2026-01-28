import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupService = async (data) => {
  const { name, email, password, role} = data;
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    throw new Error("User already exists");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  return await User.create({
    name,
    email,
    password: hashPassword,
    role: role || "USER"
  });
};

export const loginService = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not registered with this email..");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new Error("Password incorrect");
  }
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return {
    user,
    token,
  };
};
