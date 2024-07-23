import { MoneyTypeTYpe } from "@/types/money";

export async function getCorrectType({
  type,
  oppositeUserIsSame,
}: {
  type: MoneyTypeTYpe;
  oppositeUserIsSame: boolean;
}) {
  let correctType: MoneyTypeTYpe;

  switch (type) {
    case "profit":
      correctType = oppositeUserIsSame ? "expense" : "profit";
      break;

    case "expense":
      correctType = oppositeUserIsSame ? "profit" : "expense";
      break;

    case "borrow":
      correctType = oppositeUserIsSame ? "loan" : "borrow";
      break;

    case "loan":
      correctType = oppositeUserIsSame ? "borrow" : "loan";
      break;

    case "deposit":
      correctType = "deposit";
      break;
  }

  return correctType;
}
