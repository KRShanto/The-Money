import { getAuthSession } from "@/lib/auth";

export default async function Page() {
  const session = await getAuthSession();

  return (
    <div>
      <h1 className="text-main-gradient text-center text-4xl font-bold">
        Welcome to your profile
      </h1>

      <div className="mx-auto my-14 w-fit">
        <p className="text-2xl">
          <b>Name: </b>
          {session?.user?.name}
        </p>
        <p className="text-2xl">
          <b>Email: </b>
          {session?.user?.email}
        </p>
      </div>
    </div>
  );
}
