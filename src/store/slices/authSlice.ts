import { User, users } from "@/data/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export type LoginPayload = {
  email: string;
  password: string;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { email, password } = action.payload;
      const foundUser: User | undefined = users.find(
        (u) => u.email === email && u.password === password
      );

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
