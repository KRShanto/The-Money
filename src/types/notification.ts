export interface NotificationType {
  _id: string;
  to: string;
  title: string;
  body: string;
  type: "normal" | "danger" | "warning";
  links: { href: string; title: string }[];
  read: boolean;
  createdAt: Date;
}
