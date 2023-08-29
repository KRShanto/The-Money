export default function Page({
  searchParams,
}: {
  searchParams: {
    type: string;
  };
}) {
  console.log("search: ", searchParams);

  if (searchParams.type) {
    return <div>Search: {searchParams.type}</div>;
  }

  return <div>Search: All</div>;
}
