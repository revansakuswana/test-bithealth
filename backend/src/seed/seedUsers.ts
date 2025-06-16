import User from "../models/userModel";
import { hashPassword } from "../utils/hash";

export async function seedUsers() {
  const users = [
    {
      email: "admin@admin.com",
      password: await hashPassword("admin123"),
      role: "admin",
    },
    {
      email: "staff@example.com",
      password: await hashPassword("staff123"),
      role: "staff",
    },
  ];

  await User.insertMany(users);
}
