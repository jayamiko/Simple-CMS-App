"use client";

import Button from "@/components/buttons/Button";
import StatistikCard from "@/components/cards/StatisticCard";
import { WelcomeCard } from "@/components/cards/WelcomeCard";
import Header from "@/components/headers/Header";
import MainLayout from "@/components/layout/MainLayout";
import { users } from "@/data/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { usePersistedUser } from "@/hooks/usePersistedUser";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { MenuGroup } from "@/types/menu";
import { findMenuGroupById } from "@/utils/helpers";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const router: AppRouterInstance = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { groups, selectedGroupId } = useAppSelector(
    (state: RootState) => state.menu
  );

  const selectedGroup: MenuGroup | undefined = findMenuGroupById(
    groups,
    selectedGroupId
  );

  usePersistedUser(isAuthenticated, user);

  const handleLogout = () => {
    dispatch(logout());
    if (!isAuthenticated) {
      router.push("/login");
    }
  };

  const totalGroups: number = groups.length;
  const totalMenus: number = groups.reduce(
    (acc: number, g: MenuGroup) => acc + g.menus.length,
    0
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <Header title="Home" icon={<FaHome />} />

        <Button variant="danger" onClick={handleLogout} icon={<FaSignOutAlt />}>
          Logout
        </Button>
      </div>

      {isAuthenticated && user?.fullname && (
        <WelcomeCard
          name={user?.fullname}
          description={`You are currently on your CMS dashboard. Use the navigation above to manage content, configure menu settings, and oversee your website efficiently.`}
        />
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatistikCard title="Total Groups" value={totalGroups} />
        <StatistikCard title="Total Menus" value={totalMenus} />
        <StatistikCard
          title="Group Menu Used"
          value={selectedGroup?.name || "N/A"}
        />
        <StatistikCard title="Active Users" value={users?.length} />
      </div>
    </MainLayout>
  );
}
