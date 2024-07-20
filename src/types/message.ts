export interface MessageType {
  id: string;
  text: string;
  from: string;
  to: string;
  createdAt: Date;
}

export interface MessageDocument extends MessageType, Document {
  _id: string;
  purify(): MessageType;
}
