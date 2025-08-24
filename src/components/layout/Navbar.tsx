"use client";

import Button from "@/components/buttons/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import NavbarMobile from "./NavbarMobile";
import { findMenuGroupById } from "@/utils/helpers";
import { MenuGroup } from "@/types/menu";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function Navbar() {
  const router: AppRouterInstance = useRouter();
  const dispatch = useAppDispatch();
  const pathname: string = usePathname();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { groups, selectedGroupId } = useAppSelector((s: RootState) => s.menu);
  const selectedGroup: MenuGroup | undefined = findMenuGroupById(
    groups,
    selectedGroupId
  );

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const isMenuActive: (href: string) => boolean = (href: string) =>
    pathname === href;

  const handleLogout = () => {
    dispatch(logout());
    if (!isAuthenticated) router.push("/login");
  };

  return (
    <header className="w-full sticky top-0 z-20 border-b backdrop-blur bg-cyan-700">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <Link
          href="/"
          className="text-white font-bold cursor-pointer text-lg flex-shrink-0"
        >
          CMS App
        </Link>

        <div className="hidden md:flex flex-1 gap-6 items-center overflow-x-auto justify-center">
          {selectedGroup && (
            <div className="flex gap-2 p-2 rounded-lg flex-nowrap min-w-max">
              {selectedGroup.menus.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.path.startsWith("/") ? menu.path : `/${menu.path}`}
                  className={`px-4 py-2 transition flex-shrink-0 ${
                    isMenuActive(menu.path)
                      ? "font-bold text-yellow-400 hover:text-yellow-500"
                      : "font-medium text-white hover:text-gray-200"
                  }`}
                >
                  {menu.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex space-x-2">
          <Button variant="warning" icon={<FaCog />} to="/settings">
            Settings
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <FaSignOutAlt />
          </Button>
        </div>

        <Button
          customClass="md:hidden text-white ml-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </Button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && selectedGroup && (
        <NavbarMobile
          setMobileOpen={setMobileOpen}
          isMenuActive={isMenuActive}
          selectedGroup={selectedGroup}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
}

export default Navbar;
