import { loginService, signupService } from "../service/authService.js";

export const signup = async (req, res) => {
  try {
    const user = await signupService(req.body);
    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      total: 1,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginService(req.body);
    res.status(201).json({
      success: true,
      message: "Login Successfully",
      user
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
