export default function TextWithLine({ text }: { text: string }) {
  return (
    <h1 className="mt-5 flex items-center gap-5 text-center text-xl font-bold text-slate-500 dark:text-slate-400">
      <span className="h-1 w-full rounded-md bg-slate-500 dark:bg-slate-400"></span>
      <p className="whitespace-nowrap">{text}</p>
      <span className="h-1 w-full rounded-md bg-slate-500 dark:bg-slate-400"></span>
    </h1>
  );
}
