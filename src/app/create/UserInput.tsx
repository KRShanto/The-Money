"use client";

import Input from "@/components/form/Input";
import Label from "@/components/form/Label";
import Wrappar from "@/components/form/Wrappar";
import { useEffect, useState } from "react";
import { searchUsers } from "@/actions/searchUser";
import Image from "next/image";
import UserItem from "../../components/UserItem";
import { FaTimes } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { MAIN_COLOR } from "@/lib/constants";
import { UserItemType } from "../../components/UserItem";

const USER_SEARCH_TIMEOUT = 1000; // 1 second

export default function UserInput({ type }: { type: string }) {
  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [users, setUsers] = useState<UserItemType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserItemType | null>(null);
  const [finalInputValue, setFinalInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  // Whenever the input changes, change the final input
  useEffect(() => {
    setFinalInputValue(`custom:${input}`);
  }, [input]);

  function generateLabel() {
    switch (type) {
      case "income":
        return "Who paid you?";

      case "expense":
        return "Who did you pay?";

      case "gift":
        return "Who gave you a gift?";

      case "loan":
        return "Who did you loan money to?";

      case "borrow":
        return "Who did you borrow money from?";

      case "sell":
        return "Who did you sell something to?";

      default:
        return "Who?";
    }
  }

  async function getUsers(input: string) {
    if (input.length > 0) {
      // On the loader
      setLoading(true);
      // reset the users
      setUsers([]);

      const res = await searchUsers(input);

      // Off the loader
      setLoading(false);

      if (res) {
        setUsers(res.users);
      }
    } else {
      setUsers([]);
    }
  }

  return (
    <Wrappar>
      <Label htmlFor="oppositeUserInput">{generateLabel()}</Label>

      {/* Input there the value will be stored */}
      <input
        id="oppositeUser"
        name="oppositeUser"
        hidden
        defaultValue={finalInputValue}
      />

      {selectedUser ? (
        <UserItem user={selectedUser}>
          <button
            className="cursor-pointer rounded-full p-3 transition-all hover:bg-red-500 hover:bg-opacity-10 active:scale-90"
            onClick={() => {
              setSelectedUser(null);
              setFinalInputValue(`custom:${input}`);
            }}
          >
            <FaTimes className="text-xl text-red-500" />
          </button>
        </UserItem>
      ) : (
        <input
          id="oppositeUserInpur"
          name="oppositeUserInpur"
          className="input-styles"
          type="text"
          value={input}
          onChange={(e) => {
            // set the input value
            setInput(e.target.value);

            // clear the timeout
            clearTimeout(timeoutId);

            // set a new timeout
            const id = setTimeout(() => {
              getUsers(e.target.value);
            }, USER_SEARCH_TIMEOUT);

            // set the timeout id
            setTimeoutId(id);
          }}
        />
      )}

      {(users.length > 0 || loading) && (
        <h2 className="flex items-center gap-3 text-lg font-bold text-slate-400">
          Users from online
          {loading && <BeatLoader color={MAIN_COLOR} size={10} />}
        </h2>
      )}

      {users.length > 0 && (
        //  The list of users
        <ul className="mt-3 flex flex-col space-y-3">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setUsers([]);
                setFinalInputValue(
                  `user:${user.id}:${user.isFriend ? "friend" : "not-friend"}`,
                );
              }}
            >
              <UserItem
                user={user}
                className="cursor-pointer transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
              />
            </li>
          ))}
        </ul>
      )}
    </Wrappar>
  );
}
