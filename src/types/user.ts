export interface UserType {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  image: string; // TODO // default: /images/default-profile.png
}

export interface UserDocument extends UserType, Document {
  _id: string;
  password?: string;
  resetToken?: string;
  resetTokenExpires?: number;
  purify(): UserType;
}
