import { Money } from "@/models/money";
import { dbConnect } from "@/lib/dbConnect";
import DisplayMoney from "./DisplayMoney";
import { getAuthSession } from "@/lib/auth";
import LandingPage from "./LandingPage";
import { User } from "@/models/user";
import { getCorrectType } from "@/actions/getMoneyInfo";

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
    // TODO: make it work
    // $or: [
    //   { userId: session.user.id },
    //   {
    //     // BUG: its not working
    //     oppositeUser: {
    //       id: session.user.id,
    //     },
    //   },
    // ],
  }).sort({ createdAt: -1 });

  const moneyPurified = money.map((money) => money.purify());

  const newMoneyPurified = moneyPurified.filter((money) => {
    if (money.userId == id || money.oppositeUser.id == id) {
      return true;
    }
    return false;
  });

  const newMoney = await Promise.all(
    newMoneyPurified.map(async (money) => {
      if (money.oppositeUser.id == id) {
        const user = await User.findById(money.createdBy);
        return {
          ...money,
          oppositeUser: {
            ...money.oppositeUser,
            name: user?.name,
          },
          type: await getCorrectType({
            type: money.type,
            oppositeUserIsSame: true,
          }),
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
