import React from "react";

type Props = {
  title: string;
  icon?: React.ReactNode;
};

function Header({ icon, title }: Props) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        {icon} {title}
      </h1>
    </header>
  );
}

export default Header;
