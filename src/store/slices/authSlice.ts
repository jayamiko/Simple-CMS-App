import { users } from "@/data/auth";
import { AuthState, LoginPayload } from "@/types/auth";
import { User } from "@/types/user";
import { findUser } from "@/utils/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email, password } = action.payload;
      const foundUser: User | undefined = findUser(users, email, password);

      if (foundUser) {
        state.isAuthenticated = true;
        state.user = foundUser;
        state.error = null;
      } else {
        state.error = "Invalid email or password";
        state.isAuthenticated = false;
        state.user = null;
      }
    },
    logout: () => initialState,
    me: (state, action: PayloadAction<User | null | undefined>) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    },
  },
});

export const { login, logout, me } = authSlice.actions;

export const authReducer = authSlice.reducer;
