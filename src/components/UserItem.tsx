import React from "react";
import UserImage from "@/../public/user-image.png";
import Image from "next/image";
import { cn } from "@/lib/cn";

export interface UserItemType {
  id?: string;
  image: string;
  name: string;
  isFriend: boolean;
}

export default function UserItem({
  user,
  className,
  children,
}: {
  user: UserItemType;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      key={user.id}
      className={cn(
        "flex items-center justify-between  rounded-md bg-slate-100 px-5 py-2 shadow-lg dark:bg-slate-800",
        className,
      )}
    >
      <div className="flex items-center space-x-3">
        <Image
          src={user.image ? user.image : UserImage}
          alt={user.name}
          width={40}
          height={40}
          className="h-12 w-12 rounded-full"
        />

        <div>
          <p className="mb-2 text-xl font-bold">{user.name}</p>
          <span
            className={`rounded-lg border px-3 py-[1px] text-sm ${
              user.isFriend
                ? "border-green-500 text-green-500"
                : "border-red-500 text-red-500"
            }`}
          >
            {user.isFriend ? "Friend" : "Not friend"}
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
