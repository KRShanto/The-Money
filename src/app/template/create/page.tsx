import Cancel from "@/components/form/Cancel";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import NotLoggedIn from "@/components/NotLoggedIn";
import UserInput from "@/components/UserInput";
import { getAuthSession } from "@/lib/auth";
import { UserType } from "@/types/user";
import React from "react";
import SubmitBtn from "./SubmitBtn";
import Wrappar from "@/components/form/Wrappar";
import Label from "@/components/form/Label";
import TemplateType from "./TemplateType";

export default async function Page() {
  // Check if the user is logged in
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="create a template" />;
  }

  return (
    <Form title="Create a template" fullStyle>
      <UserInput type={null} />

      <Input label="Amount" name="amount" type="number" />

      <Input label="Description" name="description" />

      <TemplateType />

      <SubmitBtn />
      <Cancel prev="/template">Back</Cancel>
    </Form>
  );
}
