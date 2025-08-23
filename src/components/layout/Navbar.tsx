"use client";

import Button from "@/components/buttons/Button";
import { useAppSelector } from "@/hooks/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaCog } from "react-icons/fa";

function Navbar() {
  const pathname = usePathname();

  const { groups, selectedGroupId } = useAppSelector((s) => s.menu);
  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  const isActive = (href: string) =>
    pathname === href
      ? "text-black font-semibold cursor-pointer"
      : "text-gray-600 hover:text-black cursor-pointer";

  return (
    <header className="w-full sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <div className="w-full flex items-center gap-4">
          <span className="w-1/6 text-lg font-bold tracking-tight">
            <Link href="/" className={isActive("/")}>
              CMS App
            </Link>
          </span>
          <div className="w-full flex gap-4 p-4 bg-gray-100 rounded-lg">
            {selectedGroup?.menus.map((menu) => (
              <Link
                key={menu.id}
                href={menu.path.startsWith("/") ? menu.path : `/${menu.path}`}
                className="px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-200 transition cursor-pointer"
              >
                {menu.title}
              </Link>
            ))}
          </div>
          <Button variant="warning" icon={<FaCog />} to="/settings">
            Settings
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
