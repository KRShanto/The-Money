import NotLoggedIn from "@/components/NotLoggedIn";
import { getAuthSession } from "@/lib/auth";
import { UserType } from "@/types/user";
import React from "react";

export default async function Page() {
  // Check if the user is logged in
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="create a template" />;
  }
}
