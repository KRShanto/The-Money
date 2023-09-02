import { HiInformationCircle } from "react-icons/hi";
import { AiFillWarning } from "react-icons/ai";
import { IoAlertCircleOutline } from "react-icons/io5";
import { BiTimeFive } from "react-icons/bi";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { NotificationType } from "@/types/notification";
import NotificationItem from "./NotificationItem";

export default function NotificationList({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-5">
      {notifications.map((notification) => (
        <NotificationItem notification={notification} key={notification.id} />
      ))}
    </div>
  );
}
