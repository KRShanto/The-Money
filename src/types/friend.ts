export interface FriendType {
  id: string;
  one: string;
  two: string;
  createdAt: Date;
}

export interface FriendDocument extends FriendType, Document {
  _id: string;
  purify(): FriendType;
}
