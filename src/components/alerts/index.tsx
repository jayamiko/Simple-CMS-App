import React from "react";

function ErrorAlert({ text }: { text: string }) {
  return (
    <div className="text-red-500 text-sm text-center">
      <span>{text}</span>
    </div>
  );
}

export default ErrorAlert;
