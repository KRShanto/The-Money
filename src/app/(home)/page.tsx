import { Money } from "@/models/money";
import { dbConnect } from "@/lib/dbConnect";
import DisplayMoney from "./DisplayMoney";
import { getAuthSession } from "@/lib/auth";
import LandingPage from "./LandingPage";
import { User } from "@/models/user";

export default async function Page() {
  const session = (await getAuthSession()) as {
    user: {
      id: string;
    };
  } | null;

  if (!session) {
    return <LandingPage />;
  }

  const id = session.user.id;

  await dbConnect();

  const money = await Money.find({
    // userId: session.user.id,
    // oppositeUser: {
    //   id: session.user.id,
    // },
    //
    // TODO
    // $or: [
    //   { userId: session.user.id },
    //   {
    //     // BUG: its not working
    //     oppositeUser: {
    //       id: session.user.id,
    //     },
    //   },
    // ],
  });

  const moneyPurified = money.map((money) => money.purify());

  const newMoney = await Promise.all(
    moneyPurified.map(async (money) => {
      if (money.oppositeUser.id == id) {
        const user = await User.findById(money.createdBy);
        return {
          ...money,
          oppositeUser: {
            ...money.oppositeUser,
            name: user?.name,
          },
        };
      } else {
        return money;
      }
    }),
  );

  return (
    <>
      <DisplayMoney money={newMoney} />
    </>
  );
}
