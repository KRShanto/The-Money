"use client";

import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { AiFillBell } from "react-icons/ai";
import { getUnreadNotificationsLength } from "./getUnreadNotificationsLength";

export default function DisplayNotification() {
  const [length, setLength] = useState(0);

  useEffect(() => {
    // at very first fetch notifications.
    getNotifications();

    // then after every 5 secs, fetch notifications.
    const interval = setInterval(() => {
      getNotifications();
    }, 5000);

    // cleanup
    return () => clearInterval(interval);
  }, []);

  async function getNotifications() {
    const res = await getUnreadNotificationsLength();
    if (res.success) {
      setLength(res.data);
    }
  }

  return (
    <NavLink href="/notifications" className="relative">
      {length > 0 && (
        <p className="absolute -right-1 -top-2 text-xl text-red-500">
          {length}
        </p>
      )}
      <AiFillBell
        className="text-3xl"
        title={
          length > 0
            ? `You have ${length} unread notifications`
            : "Notification"
        }
      />
    </NavLink>
  );
}
