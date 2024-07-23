import "server-only";
import { MoneyDocument, MoneyType } from "@/types/money";
import mongoose, { Schema } from "mongoose";

const moneySchema = new Schema<MoneyDocument>({
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
    enum: ["deposit", "profit", "expense", "loan", "borrow"],
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
  history: [
    {
      amount: Number,
      date: Date,
    },
  ],
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

// Only return useful data. Remove unnecessary data
moneySchema.methods.purify = function (this: MoneyDocument) {
  return {
    id: this?._id.toString(),
    userId: this.userId,
    oppositeUser: {
      type: this.oppositeUser.type,
      id: this.oppositeUser.id,
      name: this.oppositeUser.name,
    },
    type: this.type,
    amount: this.amount,
    description: this.description,
    date: this.date,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    createdBy: this.createdBy,
    updatedBy: this.updatedBy,
    lastDate: this.lastDate,
    history: this.history?.map((history) => ({
      amount: history.amount,
      date: history.date,
    })),
  };
};

let Money: mongoose.Model<MoneyDocument>;

try {
  Money = mongoose.model<MoneyDocument>("Money");
} catch {
  Money = mongoose.model<MoneyDocument>("Money", moneySchema);
}

export { Money };
