import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/hash";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: "Pengguna sudah ada" });
      return;
    }

    const hashed = await hashPassword(password);
    await User.create({ name, email, password: hashed, role });

    res.status(201).json({
      success: true,
      message: "Pengguna berhasil terdaftar",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "Pengguna tidak ditemukan" });
      return;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Pasword salah" });
      return;
    }

    const token = generateToken({ id: user._id.toString(), role: user.role });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login berhasil",
        data: { id: user._id, email: user.email, role: user.role },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Berhasil logout",
        user: null,
      });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Gagal logout",
      error: err.message,
    });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = (req as any).user;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const foundUser = await User.findById(user.id).select("-password");
    if (!foundUser) {
      res
        .status(404)
        .json({ success: false, message: "Pengguna tidak ditemukan" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile ditemukan",
      data: foundUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err instanceof Error ? err.message : String(err),
    });
  }
};
