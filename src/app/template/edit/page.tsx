import Cancel from "@/components/form/Cancel";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import NotLoggedIn from "@/components/NotLoggedIn";
import UserInput from "@/components/UserInput";
import { getAuthSession } from "@/lib/auth";
import { UserType } from "@/types/user";
import React from "react";
import SubmitBtn from "./SubmitBtn";
import TemplateType from "../create/TemplateType";
import { notFound } from "next/navigation";
import { Template } from "@/models/template";
import { User } from "@/models/user";
import { Friend } from "@/models/friend";

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

  const template = await Template.findById(id);

  if (!template) return notFound();

  // find the other user
  const user = template.oppositeUser.id
    ? await User.findById(template.oppositeUser.id)
    : ({ name: template.oppositeUser.name, image: "" } as {
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

  return (
    <Form title="Update template" fullStyle>
      <UserInput
        type={null}
        defaultUser={{
          id: template.oppositeUser.id,
          isFriend: friend ? true : false,
          name: user?.name!,
          image: user?.image!,
        }}
      />

      <Input
        label="Amount"
        name="amount"
        type="number"
        defaultValue={template.amount}
      />

      <Input
        label="Description"
        name="description"
        defaultValue={template.description}
      />

      <TemplateType defaultValue={template.type} />

      <SubmitBtn id={template.id} />
      <Cancel prev="/template">Back</Cancel>
    </Form>
  );
}
