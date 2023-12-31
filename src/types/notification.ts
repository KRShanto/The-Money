export interface NotificationType {
  id: string;
  to: string;
  title: string;
  body: string;
  type: "normal" | "danger" | "warning";
  links: { href: string; title: string }[];
  read: boolean;
  createdAt: Date;
}

export interface NotificationDocument extends NotificationType {
  _id: string;
  purify(): NotificationType;
}
