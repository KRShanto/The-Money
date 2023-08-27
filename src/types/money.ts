export interface MoneyType {
  _id: string;
  userId: string;
  oppositeUser: {
    type: "friend" | "custom";
    // if custom
    name?: string;
    // if friend
    id?: string;
  };
  type: "income" | "expense" | "gift" | "loan" | "borrow" | "sell";
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  // which friend created this money
  createdBy: string;
  // which friend updated this money
  updatedBy?: string;
  // last date of this money. Only applicable for loan and borrow
  lastDate?: Date;
}
