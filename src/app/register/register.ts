"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import { User } from "@/models/user";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register({ name, email, password }: RegisterData) {
  await dbConnect();

  // Check if any field is missing
  if (!name || !email || !password) {
    return {
      error: "You need to fill all the fields",
    };
  }

  // check if the user already created
  const userByUsername = await User.findOne({
    email,
  });

  if (userByUsername) {
    return {
      error: "User already exist!",
    };
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error found while creating new user");
    console.error("The error: ", error);

    return {
      error: "A server side error occured",
    };
  }
}
