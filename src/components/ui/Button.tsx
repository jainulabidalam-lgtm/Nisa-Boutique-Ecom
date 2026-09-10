import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "gold" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-wider uppercase transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none text-center";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 font-medium tracking-widest",
    md: "text-xs px-6 py-3.5 font-semibold tracking-[0.18em]",
    lg: "text-sm px-8 py-4 font-semibold tracking-[0.2em]",
  };

  const variantStyles = {
    primary:
      "bg-[#181818] text-[#f5f1e8] border border-[#2e2e2e] hover:bg-[#111111] hover:border-[#c6a15b] hover:text-[#c6a15b] active:scale-[0.99]",
    gold:
      "bg-[#c6a15b] text-[#111111] border border-[#c6a15b] hover:bg-[#b58f47] hover:border-[#b58f47] active:scale-[0.99] font-semibold",
    secondary:
      "bg-[#f5f1e8] text-[#181818] border border-[#e2d8c7] hover:bg-[#eae2d3] active:scale-[0.99]",
    outline:
      "bg-transparent text-[#181818] border border-[#181818] hover:bg-[#181818] hover:text-[#f5f1e8] active:scale-[0.99]",
    ghost:
      "bg-transparent text-[#181818] hover:text-[#c6a15b] underline-offset-8 hover:underline p-0",
  };

  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
