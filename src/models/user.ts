import "server-only";
import { UserDocument, UserType } from "./../types/user";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  image: String,
  resetToken: String,
  resetTokenExpires: Number,
});

let User: mongoose.Model<UserDocument>;

try {
  User = mongoose.model<UserDocument>("User");
} catch {
  User = mongoose.model<UserDocument>("User", userSchema);
}

export { User };
