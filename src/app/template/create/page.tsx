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

export default async function Page() {
  // Check if the user is logged in
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="create a template" />;
  }

  return (
    <Form title="Create a record" fullStyle>
      <UserInput type={null} />

      <Input label="Amount" name="amount" type="number" />

      <Input label="Description" name="description" />

      <div className="flex gap-10">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="type-profit"
            id="type-profit"
            className="h-4 w-4"
            defaultChecked
          />
          <Label htmlFor="type-profit">Profit</Label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="type-expense"
            id="type-expense"
            className="h-4 w-4"
          />
          <Label htmlFor="type-expense">Expense</Label>
        </div>
      </div>

      <SubmitBtn />
      <Cancel prev="/create">Back</Cancel>
    </Form>
  );
}
