import { UserType } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMessage } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import UserImage from "@/../public/user-image.png";

export default function FriendList({ users }: { users: UserType[] }) {
  return (
    <div className="flex w-[40%] flex-col gap-3">
      <div className="flex w-full items-center justify-between border-b border-slate-700 p-3">
        <h3 className="w-[40%] font-bold">User Name</h3>

        <h3 className="w-[20%] font-bold">You owe</h3>

        <h3 className="w-[40%] text-end font-bold">Options</h3>
      </div>

      <div className="max-h-[75vh] overflow-y-scroll">
        {/* image, name, owe money (positive or negative), redirect, chat */}
        {users.map((user, index) => (
          <div
            key={index}
            className="mb-2 flex w-full items-center justify-between rounded-md border border-slate-700 p-3"
          >
            <div className="w-[40%]">
              <Link
                href={`/user/${user.id}`}
                className="flex w-fit items-center gap-3 rounded-md p-2 px-3 transition-colors hover:bg-slate-700"
              >
                <Image
                  src={user.image ? user.image : UserImage}
                  alt={user.name || "User image"}
                  width={30}
                  height={30}
                  className="h-12 w-12 rounded-full"
                />
                <p className="text-lg font-semibold">{user.name}</p>
              </Link>
            </div>

            <p className="w-[20%] text-xl">$ 300</p>

            <div className="flex w-[40%] items-center justify-end gap-3">
              <Link href={`/?user=${user.id}`}>
                <FaShare className="rotate-180 text-lg" />
              </Link>

              <Link href={`/friends?id=${user.id}`}>
                <BiMessage className="text-xl" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
