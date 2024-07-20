import { getAuthSession } from "@/lib/auth";
import { Friend } from "@/models/friend";
import { User } from "@/models/user";
import Image from "next/image";
import UserImage from "@/../public/user-image.png";
import Link from "next/link";
import { FaLink, FaShare } from "react-icons/fa";
import { BiLinkExternal, BiMessage } from "react-icons/bi";

export default async function Page() {
  const session = (await getAuthSession()) as { user: { id: string } } | null;

  const friends = await Friend.find({
    $or: [{ one: session?.user.id }, { two: session?.user.id }],
  });

  const users = await Promise.all(
    friends.map(async (friend) => {
      const id = friend.one === session?.user.id ? friend.two : friend.one;

      const user = await User.findById(id);

      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      };
    }),
  );

  return (
    <div className="m-10">
      {/* Friends List */}
      <div className="flex flex-col gap-3">
        <div className="flex w-[40%] items-center justify-between border-b border-slate-700 p-3">
          <h3 className="w-[40%] font-bold">User Name</h3>

          <h3 className="w-[20%] font-bold">You owe</h3>

          <h3 className="w-[40%] text-end font-bold">Options</h3>
        </div>

        {/* image, name, owe money (positive or negative), redirect, chat */}
        {users.map((user, index) => (
          <div
            key={index}
            className="flex w-[40%] items-center justify-between rounded-md border border-slate-700 p-3"
          >
            <div className=" w-[40%]">
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

      {/* Friend Chat */}
      <div></div>
    </div>
  );
}
