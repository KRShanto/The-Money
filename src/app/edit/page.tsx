import Cancel from "@/components/form/Cancel";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import NotLoggedIn from "@/components/NotLoggedIn";
import UserInput from "@/components/UserInput";
import { getAuthSession } from "@/lib/auth";
import { UserType } from "@/types/user";
import React from "react";
import SubmitBtn from "./SubmitBtn";
import { notFound } from "next/navigation";
import { User } from "@/models/user";
import { Friend } from "@/models/friend";
import { Money } from "@/models/money";

export default async function Page({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  // Check if the user is logged in
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="edit a template" />;
  }

  const id = searchParams.id;

  if (!id) return notFound();

  const money = await Money.findById(id);

  if (!money) return notFound();

  // find the other user
  const user = money.oppositeUser.id
    ? await User.findById(money.oppositeUser.id)
    : ({ name: money.oppositeUser.name, image: "" } as {
        id?: string;
        name: string;
        image: string;
      });

  // Check if they are friend or not
  const friend = user?.id
    ? await Friend.find({
        $or: [
          { one: session.user.id, two: user.id },
          { one: user.id, two: session.user.id },
        ],
      })
    : null;

  const type = money.type;

  return (
    <Form title="Update Record" fullStyle>
      {type !== "deposit" && (
        <UserInput
          type={null}
          defaultUser={{
            id: money.oppositeUser.id,
            isFriend: friend ? true : false,
            name: user?.name!,
            image: user?.image!,
          }}
        />
      )}

      <Input
        label="Amount"
        name="amount"
        type="number"
        defaultValue={money.amount}
      />

      {type !== "deposit" && (
        <Input
          label={`More details about your ${type}`}
          name="description"
          defaultValue={money.description}
        />
      )}

      {type !== "deposit" && (
        <Input
          label="When did this happen?"
          name="date"
          type="date"
          defaultValue={new Date(money.date).toISOString().slice(0, 10)}
        />
      )}

      {(type === "loan" || type === "borrow") && (
        <Input
          label="Last date to pay back"
          name="lastDate"
          type="date"
          defaultValue={
            money.lastDate
              ? new Date(money.lastDate).toISOString().slice(0, 10)
              : undefined
          }
        />
      )}

      <SubmitBtn id={money.id} />
      <Cancel prev="/">Back</Cancel>
    </Form>
  );
}
