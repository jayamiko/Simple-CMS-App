"use client";

import Button from "@/components/buttons/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog } from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href
      ? "text-black font-semibold"
      : "text-gray-600 hover:text-black";

  return (
    <header className="w-full sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <div className="w-full flex items-center gap-4">
          <span className="w-1/6 text-lg font-bold tracking-tight">
            <Link href="/" className={isActive("/")}>
              CMS App
            </Link>
          </span>
          <ul className="w-full flex items-center gap-4 text-sm px-2">
            <li>
              <Link href="/settings" className={isActive("/settings")}>
                Settings
              </Link>
            </li>
          </ul>
          <Button variant="warning" icon={<FaCog />} to="/settings">
            Settings
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
