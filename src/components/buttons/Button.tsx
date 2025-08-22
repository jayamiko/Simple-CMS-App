import React from "react";

type Props = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
};

function Button({ type, children }: Props) {
  return (
    <button
      type={type}
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
    >
      {children}
    </button>
  );
}

export default Button;
