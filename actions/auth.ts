"use server"
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) return { error: "All fields are required" };

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) return { error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { success: "Account created! You can now sign in." };
}
