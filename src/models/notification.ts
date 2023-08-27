import "server-only";
import { NotificationType } from "@/types/notification";
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema<NotificationType>({
  to: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let Notification: mongoose.Model<NotificationType>;

try {
  Notification = mongoose.model<NotificationType>("Notification");
} catch {
  Notification = mongoose.model<NotificationType>(
    "Notification",
    notificationSchema,
  );
}

export { Notification };
