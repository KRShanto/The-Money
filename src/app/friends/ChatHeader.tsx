import { UserType } from "@/types/user";
import Image from "next/image";
import UserImage from "@/../public/user-image.png";
import { FaTrash } from "react-icons/fa";

export default function ChatHeader({ user }: { user: UserType }) {
  return (
    <div className="flex h-[15%] justify-between border-b border-slate-600">
      {/* image, name */}
      <div className="flex items-center gap-3">
        <Image
          src={user.image ? user.image : UserImage}
          alt={user.name || "User image"}
          width={50}
          height={50}
          className="h-14 w-14 rounded-full"
        />
        <p className="text-2xl font-semibold">{user.name}</p>
      </div>

      {/* options */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 rounded-md border border-red-500 p-1 px-3 text-red-500 active:scale-95">
          <FaTrash />
          Delete Friend
        </button>
      </div>
    </div>
  );
}
