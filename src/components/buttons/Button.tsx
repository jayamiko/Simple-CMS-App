import Link from "next/link";
import React from "react";

type Props = {
  type?: "submit" | "reset" | "button";
  customClass?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  variant?: "primary" | "danger" | "info" | "warning";
  disabled?: boolean;
  icon?: React.ReactNode;
  to?: string;
};

function Button({
  type = "button",
  customClass,
  onClick,
  children,
  variant = "primary",
  disabled = false,
  icon,
  to,
}: Props) {
  const baseClass =
    "flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm md:text-base transition-colors cursor-pointer";
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    info: "bg-sky-600 text-white hover:bg-sky-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  const className = `${baseClass} ${variants[variant]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  if (to) {
    return (
      <Link href={to}>
        <button className={customClass ? customClass : className}>
          {icon}
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={customClass ? customClass : className}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;
