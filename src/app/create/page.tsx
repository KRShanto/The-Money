import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import { MoneyTypeTYpe } from "@/types/money";
import Link from "next/link";
import SubmitBtn from "./SubmitBtn";
import Cancel from "@/components/form/Cancel";
import UserInput from "./UserInput";
import { getAuthSession } from "@/lib/auth";
import NotLoggedIn from "@/components/NotLoggedIn";
import { TYPES } from "@/lib/constants";
import { UserType } from "@/types/user";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) {
  // Check if the user is logged in
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="create a record" />;
  }

  const type = searchParams.type as MoneyTypeTYpe;

  const options: {
    label: string;
    value: MoneyTypeTYpe;
  }[] = [
    {
      label: "I earned money (Profit)",
      value: "profit",
    },
    {
      label: "I spent money (Expense)",
      value: "expense",
    },
    {
      label: "I gave someone money (Loan)",
      value: "loan",
    },
    {
      label: "I borrowed money (Borrow)",
      value: "borrow",
    },
    {
      label: "I start with an initial (Deposit)",
      value: "deposit",
    },
  ];

  if (type && TYPES.includes(type)) {
    return (
      <Form title="Create a record" fullStyle>
        {type !== "deposit" && <UserInput type={type} />}

        <Input label="Amount" name="amount" type="number" />

        {type !== "deposit" && (
          <Input label={`More details about your ${type}`} name="description" />
        )}

        {/* TODO: optional date */}
        {type !== "deposit" && (
          <Input label="When did this happen?" name="date" type="date" />
        )}

        {(type === "loan" || type === "borrow") && (
          <Input label="Last date to pay back" name="lastDate" type="date" />
        )}

        <SubmitBtn
          type={type}
          userId={session.user.id}
          userName={session.user.name}
        />
        <Cancel prev="/create">Back</Cancel>
      </Form>
    );
  }

  return (
    <>
      <h2 className="text-main-gradient my-7 text-center text-3xl font-bold">
        What type of record do you want to create?
      </h2>

      <div className="mx-auto flex w-fit flex-col gap-2">
        {options.map((option) => (
          <Link
            href={`/create?type=${option.value}`}
            key={option.value}
            className="btn txt-shadow bg-slate-700 p-5 text-2xl hover:bg-slate-600"
          >
            {option.label}
          </Link>
        ))}
      </div>
    </>
  );
}
