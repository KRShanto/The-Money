export interface NotificationType {
  _id: string;
  to: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: Date;
}
