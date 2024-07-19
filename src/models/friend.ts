import "server-only";
import { FriendDocument, FriendType } from "@/types/friend";
import mongoose, { Schema } from "mongoose";

const friendSchema = new Schema<FriendDocument>({
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

// Only return useful data. Remove unnecessary data
friendSchema.methods.purify = function (this: FriendDocument) {
  return {
    id: this._id.toString(),
    one: this.one,
    two: this.two,
    createdAt: this.createdAt,
  };
};
let Friend: mongoose.Model<FriendDocument>;

try {
  Friend = mongoose.model<FriendDocument>("Friend");
} catch {
  Friend = mongoose.model<FriendDocument>("Friend", friendSchema);
}

export { Friend };
