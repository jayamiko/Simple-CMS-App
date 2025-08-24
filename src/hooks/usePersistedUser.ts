"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { me } from "@/store/slices/authSlice";
import { User } from "@/types/user";

export function usePersistedUser(isAuthenticated: boolean, user: User | null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && !user) {
      const persistedRoot: string | null = localStorage.getItem("persist:root");
      if (persistedRoot) {
        try {
          const parsedRoot = JSON.parse(persistedRoot);
          const auth = JSON.parse(parsedRoot.auth);
          if (auth?.user) {
            dispatch(me(auth.user));
          }
        } catch (err) {
          console.error("Failed to parse persisted root:", err);
        }
      }
    }
  }, [isAuthenticated, user, dispatch]);
}
