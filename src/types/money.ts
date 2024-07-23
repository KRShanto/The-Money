export interface MoneyType {
  id: string;
  userId: string;
  oppositeUser: {
    type: "user" | "custom";
    name?: string;
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
  history?: { amount: number; date: Date }[];
}

export type MoneyTypeTYpe =
  | "deposit"
  | "profit"
  | "expense"
  | "loan"
  | "borrow";

export interface MoneyDocument extends MoneyType, Document {
  _id: string;
  purify(): MoneyType;
}
