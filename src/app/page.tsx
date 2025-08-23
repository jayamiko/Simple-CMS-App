"use client";

import Button from "@/components/buttons/Button";
import { WelcomeCard } from "@/components/cards/WelcomeCard";
import MainLayout from "@/components/layout/MainLayout";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logout, me } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state: RootState) => state.auth
  );

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

  return (
    <MainLayout>
      <div className="flex items-center justify-between">
        <span className="text-sm md:text-base text-gray-800 font-bold">
          Home
        </span>
        <Button variant="danger" onClick={handleLogout} icon={<FaSignOutAlt />}>
          Logout
        </Button>
      </div>

      {isAuthenticated && user?.fullname && (
        <WelcomeCard name={user?.fullname} />
      )}
    </MainLayout>
  );
}
