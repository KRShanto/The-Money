"use client";

import { searchUsers } from "@/actions/searchUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserImage from "@/../public/user-image.png";
import { FaPlus, FaSearch } from "react-icons/fa";
import { addFriend } from "@/actions/addFriend";

export default function Page() {
  const [users, setUsers] = useState<
    { id: string; name: string; image: string; isFriend: boolean }[]
  >([]);

  async function search(data: FormData) {
    const name = data.get("name") as string;
    const res = await searchUsers(name);

    setUsers(res.users);
  }

  async function send(userId: string) {
    const res = await addFriend(userId);

    if (res.success) {
      setUsers((prev) =>
        prev.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isFriend: true,
            };
          } else {
            return user;
          }
        }),
      );
    }
  }

  return (
    <div className="relative mx-auto my-10 w-[40rem]">
      <form action={search}>
        <h2 className="mb-5 text-center text-2xl font-bold">Add a friend</h2>

        <div className="flex w-full items-center gap-1">
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md border-none bg-[#ffffff1d] p-3 px-5 text-xl outline-none"
            placeholder="Search users"
          />
          {/* TODO: loading */}
          <button className="rounded-full p-3 transition-colors hover:bg-[#ffffff27] active:scale-95">
            <FaSearch className="text-3xl" />
          </button>
        </div>
      </form>

      {users.length > 0 && (
        <div className="mt-10 flex flex-col items-center gap-3">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex w-[25rem] items-center justify-between rounded-md border border-slate-600 p-2"
            >
              <Link
                href={`/user/${user.id}`}
                className="flex w-full items-center gap-3 rounded-md p-2 px-3 transition-colors hover:bg-slate-800"
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

              {/* TODO: Loading */}
              {!user.isFriend && (
                <button
                  className="rounded-md p-3 text-2xl transition-colors hover:bg-[#ffffff27] active:scale-95"
                  onClick={() => send(user.id)}
                >
                  <FaPlus />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
