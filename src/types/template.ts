export interface TemplateType {
  id: string;
  userId: string;
  oppositeUser: {
    type: "user" | "custom";
    name: string;
    id?: string;
  };
  type: "profit" | "expense";
  amount: number;
  description: string;
  createdAt: Date;
}

export interface TemplateDocument extends TemplateType, Document {
  _id: string;
  purify(): TemplateType;
}
