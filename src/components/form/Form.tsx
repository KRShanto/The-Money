import FormError from "./FormError";

export default function Form({
  title,
  className,
  action,
  fullStyle,
  elementSelectorToScrollOnError,
  children,
}: {
  title?: string;
  className?: string;
  action?: (formData: FormData) => Promise<void>;
  fullStyle?: boolean;
  elementSelectorToScrollOnError?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className={`
        flex w-[30rem] flex-col max-[600px]:w-[90%] ${
          fullStyle
            ? "mx-auto my-[2rem] rounded-md border-themeColorLight px-[1.5rem] py-[2rem] shadow-2xl dark:border dark:shadow-none"
            : ""
        }
      
      ${className}`}
    >
      {title && (
        <h1 className="text-main-gradient text-center text-3xl font-bold max-[1000px]:text-2xl max-[600px]:text-xl">
          {title}
        </h1>
      )}

      <FormError elementToScroll={elementSelectorToScrollOnError} />

      {children}
    </form>
  );
}
