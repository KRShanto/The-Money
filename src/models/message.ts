import "server-only";
import { MessageType, MessageDocument } from "@/types/message";
import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema<MessageDocument>({
  text: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Only return useful data. Remove unnecessary data
messageSchema.methods.purify = function (this: MessageDocument) {
  return {
    id: this._id.toString(),
    text: this.text,
    from: this.from,
    to: this.to,
    createdAt: this.createdAt,
  };
};
let Message: mongoose.Model<MessageDocument>;

try {
  Message = mongoose.model<MessageDocument>("Message");
} catch {
  Message = mongoose.model<MessageDocument>("Message", messageSchema);
}

export { Message };
