import clsx from "clsx";
import React from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
}

function Button({ className, onClick, children, style, type }: Props) {
  const defaultClasses =
    "h-[42px] px-4 flex items-center justify-center rounded-lg font-semibold hover:bg-white/80 transition duration-200 ease-in-out";
  return (
    <button
      onClick={onClick}
      style={style}
      type={type || "button"}
      className={clsx(defaultClasses, className)}
    >
        {children}
    </button>
  );
}

export default Button;
