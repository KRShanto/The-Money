import NotLoggedIn from "@/components/NotLoggedIn";
import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Notification } from "@/models/notification";
import { UserType } from "@/types/user";
import NotificationList from "./NotificationList";
import TextWithLine from "./TextWithLine";

export default async function Page() {
  const session = (await getAuthSession()) as { user: UserType } | null;

  if (!session) {
    return <NotLoggedIn task="view notifications" />;
  }

  await dbConnect();

  const notificationsRead = await Notification.find({
    to: session.user.id,
    read: true,
  }).sort({ createdAt: -1 });

  const notificationsUnread = await Notification.find({
    to: session.user.id,
    read: false,
  }).sort({ createdAt: -1 });

  const purifiedNotificationsRead = notificationsRead.map((notification) => {
    return notification.purify();
  });

  const purifiedNotificationsUnread = notificationsUnread.map(
    (notification) => {
      return notification.purify();
    },
  );

  return (
    <div className="mx-auto w-[95%] max-w-[1250px]">
      <TextWithLine text="New Notifications" />

      <NotificationList notifications={purifiedNotificationsUnread} />

      <TextWithLine text="Old Notifications" />

      <NotificationList notifications={purifiedNotificationsRead} />
    </div>
  );
}
