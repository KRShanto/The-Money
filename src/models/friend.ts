import "server-only";
import { FriendType } from "@/types/friend";
import mongoose, { Schema } from "mongoose";

const friendSchema = new Schema<FriendType>({
  one: {
    type: String,
    required: true,
  },
  two: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let Friend: mongoose.Model<FriendType>;

try {
  Friend = mongoose.model<FriendType>("Friend");
} catch {
  Friend = mongoose.model<FriendType>("Friend", friendSchema);
}

export { Friend };
