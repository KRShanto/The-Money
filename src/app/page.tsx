import { Money } from "@/models/money";
import { dbConnect } from "@/lib/dbConnect";
import DisplayMoney from "./home/DisplayMoney";

export default async function Page() {
  await dbConnect();

  const money = await Money.find({});

  return (
    <>
      <DisplayMoney money={money} />
    </>
  );
}
