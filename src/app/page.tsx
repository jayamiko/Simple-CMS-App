"use client";

import Button from "@/components/buttons/Button";
import StatistikCard from "@/components/cards/StatisticCard";
import { WelcomeCard } from "@/components/cards/WelcomeCard";
import Header from "@/components/headers/Header";
import MainLayout from "@/components/layout/MainLayout";
import { users } from "@/data/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout, me } from "@/store/slices/authSlice";
import { MenuGroup } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { groups, selectedGroupId } = useAppSelector(
    (state: RootState) => state.menu
  );
  const selectedGroup = groups.find((g: MenuGroup) => g.id === selectedGroupId);

  useEffect(() => {
    if (isAuthenticated && !user) {
      const persistedRoot = localStorage.getItem("persist:root");
      if (persistedRoot) {
        const parsedRoot = JSON.parse(persistedRoot);
        const auth = JSON.parse(parsedRoot.auth);
        if (auth?.user) {
          dispatch(me(auth.user));
        }
      }
    }
  }, [isAuthenticated, user, dispatch]);

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
        {selectedGroup?.name && (
          <StatistikCard title="Group Menu Used" value={selectedGroup?.name} />
        )}
        <StatistikCard title="Active Users" value={users?.length} />
      </div>
    </MainLayout>
  );
}
