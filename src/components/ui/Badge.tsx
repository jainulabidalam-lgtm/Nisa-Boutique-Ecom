import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "charcoal" | "ivory" | "outline";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "gold",
  className = "",
  size = "sm",
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center uppercase tracking-widest font-sans font-medium transition-colors";

  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-xs px-3 py-1",
  };

  const variantStyles = {
    gold: "bg-[#c6a15b]/10 text-[#a98235] border border-[#c6a15b]/30",
    charcoal: "bg-[#181818] text-[#f5f1e8] border border-[#333333]",
    ivory: "bg-[#f5f1e8] text-[#181818] border border-[#e5ded0]",
    outline: "bg-transparent text-[#666666] border border-[#d8cfc0]",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
