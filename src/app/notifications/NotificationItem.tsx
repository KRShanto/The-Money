"use client";

import { cn } from "@/lib/cn";
import { NotificationType } from "@/types/notification";
import moment from "moment";
import Link from "next/link";
import { AiFillWarning } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { markNotificationRead } from "./markNotificationRead";
import { deleteNotification } from "./deleteNotification";

export default function NotificationItem({
  notification,
}: {
  notification: NotificationType;
}) {
  const { ref, inView } = useInView();

  // Mark notification as read when it comes into view
  useEffect(() => {
    if (inView) {
      console.log("I am going to mark this notification as read");
      if (!notification.read) markNotificationRead(notification.id);
    }
  }, [inView]);

  return (
    <div
      className="flex w-full flex-col items-center justify-center rounded-md bg-slate-50 px-4 py-2 shadow-md dark:border-b-2 dark:border-r-2 dark:border-slate-600 dark:bg-slate-800 dark:shadow-none"
      ref={ref}
    >
      <div className="flex w-full flex-row items-center justify-between">
        {/* Top */}
        <div className="flex flex-row items-center justify-start">
          {/* A circle indicating the type */}
          <div
            className={cn(
              "flex h-12 w-12 flex-col items-center justify-center rounded-full",
              {
                "bg-red-500": notification.type === "danger",
                "bg-yellow-500": notification.type === "warning",
                "bg-green-500": notification.type === "normal",
              },
            )}
          >
            {notification.type === "danger" && (
              <IoAlertCircleOutline className="text-3xl text-white" />
            )}
            {notification.type === "warning" && (
              <AiFillWarning className="text-3xl text-white" />
            )}
            {notification.type === "normal" && (
              <HiInformationCircle className="text-3xl text-white" />
            )}
          </div>

          {/* Title and date */}
          <div className="ml-4 flex flex-col items-start justify-center">
            <p className="text-2xl font-bold">{notification.title}</p>

            <p className="flex items-center gap-2 text-base text-slate-500 dark:text-slate-400">
              <BiTimeFive />
              {moment(notification.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>

        {/* Delete button */}
        <button
          className="rounded-full p-3 transition-all duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-slate-600"
          onClick={() => deleteNotification(notification.id)}
        >
          <FaTimes className="text-2xl text-slate-500 dark:text-slate-400" />
        </button>
      </div>

      {/* Body */}
      <div className="mt-4 w-full">
        <p className="text-xl">{notification.body}</p>
      </div>

      {/* Links */}
      {notification.links.length > 0 && (
        <div className="mt-2 flex w-full justify-end gap-3">
          {notification.links.map((link, i) => (
            <Link href={link.href} key={i} className="btn btn-blue">
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
