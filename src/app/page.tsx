import { Money } from "@/models/money";
import { dbConnect } from "@/lib/dbConnect";
import DisplayMoney from "./home/DisplayMoney";
import { getAuthSession } from "@/lib/auth";
import LandingPage from "./home/LandingPage";

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
    userId: session.user.id,
  });

  const moneyPurified = money.map((money) => money.purify());

  return <>{<DisplayMoney money={moneyPurified} />}</>;
}
