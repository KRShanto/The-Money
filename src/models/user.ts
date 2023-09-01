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

// Only return useful data. Remove unnecessary data
userSchema.methods.purify = function (this: UserDocument) {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    role: this.role,
    image: this.image,
  };
};

let User: mongoose.Model<UserDocument>;

try {
  User = mongoose.model<UserDocument>("User");
} catch {
  User = mongoose.model<UserDocument>("User", userSchema);
}

export { User };
