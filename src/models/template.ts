import "server-only";
import { TemplateDocument } from "@/types/template";
import mongoose, { Schema } from "mongoose";

const templateSchema = new Schema<TemplateDocument>({
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
    enum: ["profit", "expense"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Only return useful data. Remove unnecessary data
templateSchema.methods.purify = function (this: TemplateDocument) {
  return {
    id: this._id.toString(),
    userId: this.userId,
    oppositeUser: {
      type: this.oppositeUser.type,
      id: this.oppositeUser.id,
      name: this.oppositeUser.name,
    },
    type: this.type,
    amount: this.amount,
    description: this.description,
    createdAt: this.createdAt,
  };
};

let Template: mongoose.Model<TemplateDocument>;

try {
  Template = mongoose.model<TemplateDocument>("Template");
} catch {
  Template = mongoose.model<TemplateDocument>("Template", templateSchema);
}

export { Template };
