import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBaseProps = {
  variant: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps & {
  as?: "button";
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = ButtonBaseProps & {
  as: "link";
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold rounded-[12px] transition-all duration-200 ease-out";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "text-black bg-white hover:bg-white/95 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]",
  secondary: "text-white bg-accent hover:bg-accent/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(14,165,233,0.3)]",
  ghost: "text-white bg-white/10 border border-white/20 hover:bg-white/20",
};

export default function Button({
  variant,
  as = "button",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if (as === "link") {
    const { href } = props as ButtonAsLink;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", disabled, onClick } = props as ButtonAsButton;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
