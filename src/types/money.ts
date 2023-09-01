export interface MoneyType {
  _id: string;
  userId: string;
  oppositeUser: {
    type: "user" | "custom";
    // if custom
    name?: string;
    // if friend
    id?: string;
  };
  type: MoneyTypeTYpe;
  amount: number;
  description: string;
  // date when the user did something with money
  date: Date;
  createdAt: Date;
  updatedAt?: Date;
  // which friend created this money
  createdBy: string;
  // which friend updated this money
  updatedBy?: string;
  // last date of this money. Only applicable for loan and borrow
  lastDate?: Date;
}

export type MoneyTypeTYpe =
  | "income"
  | "expense"
  | "gift"
  | "loan"
  | "borrow"
  | "sell";
