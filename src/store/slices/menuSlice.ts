import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Menu {
  id: string;
  title: string;
  path: string;
}

export interface MenuGroup {
  id: string;
  name: string;
  menus: Menu[];
}

interface MenuState {
  groups: MenuGroup[];
  selectedGroupId: string | null;
}

const initialState: MenuState = {
  groups: [],
  selectedGroupId: null,
};

export type GroupPayload = {
  groupName: string;
};

export type MenuPayload = {
  title: string;
  path: string;
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.groups.push({ ...action.payload, menus: [] });
    },
    removeGroup: (state, action: PayloadAction<string>) => {
      state.groups = state.groups.filter((g) => g.id !== action.payload);
    },
    addMenu: (
      state,
      action: PayloadAction<{ groupId: string; title: string; path: string }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.menus.push({
          id: crypto.randomUUID(),
          title: action.payload.title,
          path: action.payload.path,
        });
      }
    },
    removeMenu: (
      state,
      action: PayloadAction<{ groupId: string; menuId: string }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.menus = group.menus.filter((m) => m.id !== action.payload.menuId);
      }
    },
    selectGroup: (state, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
  },
});

export const { addGroup, removeGroup, addMenu, removeMenu, selectGroup } =
  menuSlice.actions;
export const menuReducer = menuSlice.reducer;
