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

export interface MenuState {
  groups: MenuGroup[];
  selectedGroupId: string | null;
}

export type GroupPayload = {
  groupName: string;
};

export type AddGroupPayload = {
  id: string;
  name: string;
};

export type MenuPayload = {
  groupId: string;
  title: string;
  path: string;
};

export type GroupMenuIDPayload = { groupId: string; menuId: string };

export type OrderMenuPayload = {
  groupId: string;
  fromIndex: number;
  toIndex: number;
};
