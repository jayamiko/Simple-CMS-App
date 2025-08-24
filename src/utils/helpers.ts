import { Menu, MenuGroup } from "@/types/menu";
import { User } from "@/types/user";
import { FieldValues, UseFormHandleSubmit } from "react-hook-form";

export function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-");
}

export function camelCaseToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

export function handleEnterSubmit<T extends FieldValues>(
  e: React.KeyboardEvent<HTMLInputElement>,
  handleSubmit: UseFormHandleSubmit<T>,
  onValid: (data: T) => void
) {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSubmit(onValid)();
  }
}

export function findUser(
  users: User[],
  email: string,
  password: string
): User | undefined {
  return users.find((u: User) => u.email === email && u.password === password);
}

export function findMenuGroupById(
  groups: MenuGroup[],
  groupId: string | null
): MenuGroup | undefined {
  return groups.find((g: MenuGroup) => g.id === groupId);
}

export function findMenuIndexes(
  menus: Menu[],
  draggingId: string,
  targetId: string
): { fromIndex: number; toIndex: number } {
  const fromIndex: number = menus.findIndex((m: Menu) => m.id === draggingId);
  const toIndex: number = menus.findIndex((m: Menu) => m.id === targetId);

  return { fromIndex, toIndex };
}

export function findMenuBySlug(
  menus: Menu[] | undefined,
  slug: string
): Menu | undefined {
  return menus?.find((menu: Menu) => menu.path === slug);
}
