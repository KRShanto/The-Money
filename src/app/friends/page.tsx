import { getAuthSession } from "@/lib/auth";
import { Friend } from "@/models/friend";
import { User } from "@/models/user";
import Chat from "./Chat";
import FriendList from "./FriendList";

export default async function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // Get the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;

  // Select all friends that match the current user
  const friends = await Friend.find({
    $or: [{ one: session?.user.id }, { two: session?.user.id }],
  });

  // Query the opposite user (friend)
  const users = await Promise.all(
    friends.map(async (friend) => {
      const id = friend.one == session?.user.id ? friend.two : friend.one;

      console.log("Session id for friend: ", session?.user.id);
      console.log("Friend id: ", id);

      const user = await User.findById(id);

      return {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        image: user?.image,
      };
    }),
  );

  const { id } = searchParams;

  // Selected user to open chat.
  const selectedUser = id ? users.filter((user) => user.id === id)[0] : null;

  return (
    <div className="m-10 flex justify-center gap-10">
      <FriendList users={users as any} />
      <Chat user={selectedUser as any} />
    </div>
  );
}
