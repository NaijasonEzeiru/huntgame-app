import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "w-full md:text-[1.375rem] h-16 font-extrabold sm:h-20 xl:h-24 px-6 text-center rounded-[1.875rem] md:rounded-[3.125rem] flex bg-[#D9D9D9] py-2 text-sm  placeholder:text-slate-700 placeholder:text-center focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 max-w-[32rem] mx-auto",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
