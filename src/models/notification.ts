import "server-only";
import { NotificationDocument, NotificationType } from "@/types/notification";
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema<NotificationDocument>({
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

// Only return useful data. Remove unnecessary data
notificationSchema.methods.purify = function (this: NotificationDocument) {
  return {
    id: this._id.toString(),
    to: this.to,
    title: this.title,
    body: this.body,
    type: this.type,
    links: this.links,
    read: this.read,
    createdAt: this.createdAt,
  };
};

let Notification: mongoose.Model<NotificationDocument>;

try {
  Notification = mongoose.model<NotificationDocument>("Notification");
} catch {
  Notification = mongoose.model<NotificationDocument>(
    "Notification",
    notificationSchema,
  );
}

export { Notification };
