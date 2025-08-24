import {
  AddGroupPayload,
  GroupMenuIDPayload,
  Menu,
  MenuGroup,
  MenuPayload,
  MenuState,
  OrderMenuPayload,
} from "@/types/menu";
import { findMenuGroupById } from "@/utils/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MenuState = {
  groups: [],
  selectedGroupId: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    addGroup: (state: MenuState, action: PayloadAction<AddGroupPayload>) => {
      state.groups.push({ ...action.payload, menus: [] });
    },
    removeGroup: (state: MenuState, action: PayloadAction<string>) => {
      state.groups = state.groups.filter(
        (g: MenuGroup) => g.id !== action.payload
      );
    },
    addMenu: (state: MenuState, action: PayloadAction<MenuPayload>) => {
      const { groupId, path, title } = action.payload;

      const group: MenuGroup | undefined = findMenuGroupById(
        state.groups,
        groupId
      );

      if (group) {
        group.menus.push({
          id: crypto.randomUUID(),
          title: title,
          path: path,
        });
      }
    },
    removeMenu: (
      state: MenuState,
      action: PayloadAction<GroupMenuIDPayload>
    ) => {
      const { groupId, menuId } = action.payload;

      const group: MenuGroup | undefined = findMenuGroupById(
        state.groups,
        groupId
      );

      if (group) {
        group.menus = group.menus.filter((m: Menu) => m.id !== menuId);
      }
    },
    selectGroup: (state: MenuState, action: PayloadAction<string>) => {
      state.selectedGroupId = action.payload;
    },
    reorderMenu: (
      state: MenuState,
      action: PayloadAction<OrderMenuPayload>
    ) => {
      const { groupId, fromIndex, toIndex } = action.payload;
      const group: MenuGroup | undefined = findMenuGroupById(
        state.groups,
        groupId
      );
      if (group) {
        const [removed] = group.menus.splice(fromIndex, 1);
        group.menus.splice(toIndex, 0, removed);
      }
    },
  },
});

export const {
  addGroup,
  removeGroup,
  addMenu,
  removeMenu,
  selectGroup,
  reorderMenu,
} = menuSlice.actions;

export const menuReducer = menuSlice.reducer;
