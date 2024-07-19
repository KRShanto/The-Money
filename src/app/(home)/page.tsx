import { Money } from "@/models/money";
import { dbConnect } from "@/lib/dbConnect";
import DisplayMoney from "./DisplayMoney";
import { getAuthSession } from "@/lib/auth";
import LandingPage from "./LandingPage";

export default async function Page() {
  const session = (await getAuthSession()) as {
    user: {
      id: string;
    };
  } | null;

  if (!session) {
    return <LandingPage />;
  }

  await dbConnect();

  const money = await Money.find({
    // userId: session.user.id,
    // oppositeUser: {
    //   id: session.user.id,
    // },
    $or: [
      { userId: session.user.id },
      {
        // BUG: its not working
        oppositeUser: {
          id: session.user.id,
        },
      },
    ],
  });

  const moneyPurified = money.map((money) => money.purify());

  return (
    <>
      <DisplayMoney money={moneyPurified} />
    </>
  );
}
