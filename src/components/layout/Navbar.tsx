"use client";

import Button from "@/components/buttons/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout } from "@/store/slices/authSlice";
import { MenuGroup } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaCog, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const { groups, selectedGroupId } = useAppSelector((s: RootState) => s.menu);
  const selectedGroup = groups.find((g: MenuGroup) => g.id === selectedGroupId);

  const isMenuActive = (href: string) => {
    return pathname === href;
  };

  const handleLogout = () => {
    dispatch(logout());

    if (!isAuthenticated) {
      router.push("/login");
    }
  };

  return (
    <header className="w-full sticky top-0 z-10 border-b backdrop-blur bg-cyan-700">
      <nav className="mx-auto max-w-5xl flex items-center justify-between p-4">
        <div className="w-full flex items-center gap-4">
          <Link
            href="/"
            className="w-1/6 text-white font-bold cursor-pointer text-lg"
          >
            CMS App
          </Link>
          <div className="w-full overflow-x-auto">
            {selectedGroup && (
              <div className="flex gap-4 p-4 bg-gray-100 rounded-lg flex-nowrap min-w-max">
                {selectedGroup?.menus.map((menu) => (
                  <Link
                    key={menu.id}
                    href={
                      menu.path.startsWith("/") ? menu.path : `/${menu.path}`
                    }
                    className={`px-4 py-2 rounded-lg shadow transition cursor-pointer flex-shrink-0 ${
                      isMenuActive(menu.path)
                        ? "font-bold bg-yellow-400 hover:bg-yellow-500"
                        : "font-medium bg-white hover:bg-gray-200"
                    }`}
                  >
                    {menu.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex space-x-1">
            <Button variant="warning" icon={<FaCog />} to="/settings">
              Settings
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              <FaSignOutAlt />
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
