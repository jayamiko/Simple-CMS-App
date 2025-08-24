"use client";

import React from "react";
import Button from "../buttons/Button";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import { Menu, MenuGroup } from "@/types/menu";

type Props = {
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedGroup: MenuGroup;
  isMenuActive: (href: string) => boolean;
  handleLogout: () => void;
};

function NavbarMobile({
  setMobileOpen,
  selectedGroup,
  isMenuActive,
  handleLogout,
}: Props) {
  return (
    <div className="md:hidden bg-gray-100 p-4 border-t shadow-lg">
      <div className="flex flex-col gap-2">
        {selectedGroup.menus.map((menu: Menu) => (
          <Link
            key={menu.id}
            href={menu.path.startsWith("/") ? menu.path : `/${menu.path}`}
            className={`px-4 py-2 rounded-lg transition ${
              isMenuActive(menu.path) ? "font-bold" : "font-medium"
            }`}
            onClick={() => setMobileOpen(false)}
          >
            {menu.title}
          </Link>
        ))}
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="warning" to="/settings">
          <FaCog />
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          <FaSignOutAlt />
        </Button>
      </div>
    </div>
  );
}

export default NavbarMobile;
