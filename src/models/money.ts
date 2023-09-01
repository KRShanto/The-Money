import "server-only";
import { MoneyType } from "@/types/money";
import mongoose, { Schema } from "mongoose";

const moneySchema = new Schema<MoneyType>({
  userId: {
    type: String,
    required: true,
  },
  oppositeUser: {
    type: {
      type: String,
      enum: ["user", "custom"],
      required: true,
    },
    id: String,
    name: String,
  },
  type: {
    type: String,
    enum: ["income", "expense", "gift", "loan", "borrow", "sell"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  createdBy: {
    type: String,
    required: true,
  },
  updatedBy: String,
  lastDate: Date,
});

let Money: mongoose.Model<MoneyType>;

try {
  Money = mongoose.model<MoneyType>("Money");
} catch {
  Money = mongoose.model<MoneyType>("Money", moneySchema);
}

export { Money };
