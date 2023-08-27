import { getAuthSession } from "@/lib/auth";

export default async function Page() {
  const sesison = await getAuthSession();

  return (
    <>
      <h1 className="text-4xl font-bold">Hello {sesison?.user?.name}</h1>
    </>
  );
}
