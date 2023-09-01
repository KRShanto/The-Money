import "server-only";
import { NotificationType } from "@/types/notification";
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema<NotificationType>({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: String,
  type: {
    type: String,
    enum: ["normal", "danger", "warning"],
    default: "normal",
  },
  links: [
    {
      href: String,
      title: String,
    },
  ],
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
