// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean
// }

import { cn } from "@/lib/utils";

const Button = ({
  disabled = true,
  text,
  className,
  ...props
}: {
  disabled: boolean;
  text: string;
  className?: string;
}) => {
  return (
    <button
      className={cn(
        "w-full bg-[#D20F89] md:text-[1.375rem] h-16 font-extrabold sm:h-20 xl:h-24 text-white rounded-[1.875rem] md:rounded-[3.125rem] flex items-center justify-center whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 max-w-[32rem] mx-auto",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {disabled && (
        <span className="mr-2 animate-spin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            // class="lucide lucideLoader"
          >
            <path d="M12 2v4" />
            <path d="m16.2 7.8 2.9-2.9" />
            <path d="M18 12h4" />
            <path d="m16.2 16.2 2.9 2.9" />
            <path d="M12 18v4" />
            <path d="m4.9 19.1 2.9-2.9" />
            <path d="M2 12h4" />
            <path d="m4.9 4.9 2.9 2.9" />
          </svg>
        </span>
      )}
      {text}
    </button>
  );
};

export default Button;
