"use server";

import { User } from "@/models/user";
import { Friend } from "@/models/friend";
import { dbConnect } from "@/lib/dbConnect";
import { getAuthSession } from "@/lib/auth";

export async function searchUsers(nameToSearch: string) {
  await dbConnect();

  const session = (await getAuthSession()) as { user: { id: string } } | null;

  // Trim the name
  nameToSearch = nameToSearch.trim();

  // Get the users that match the name
  // don't include the current user
  const users = await User.find({
    _id: { $ne: session?.user?.id },
    name: { $regex: nameToSearch, $options: "i" },
  });

  const usersWithFriend = users.map(async (user) => {
    // Check if the user is the friend of the current user
    // Find where `one` and `two` are these two users
    const friend = await Friend.findOne({
      $or: [
        { one: session?.user?.id, two: user._id },
        { one: user._id, two: session?.user?.id },
      ],
    });

    return {
      _id: user._id.toString(),
      name: user.name,
      image: user.image,
      isFriend: !!friend,
    };
  });

  return {
    users: await Promise.all(usersWithFriend),
  };
}
