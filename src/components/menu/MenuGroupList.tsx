import { useAppSelector } from "@/hooks/hooks";
import { MenuGroup } from "@/store/slices/menuSlice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import GroupMenus from "./GroupMenus";
import MenuGroupItem from "./MenuGroupItem";

function MenuGroupList() {
  const groups = useAppSelector((s: RootState) => s.menu.groups);

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <ul className="mt-4 divide-y rounded-xl border">
      {groups.map((group: MenuGroup, index: number) => (
        <MenuGroupItem
          key={index}
          item={group}
          expanded={expanded}
          setExpanded={setExpanded}
        >
          {expanded[group.id] && <GroupMenus groupId={group.id} />}
        </MenuGroupItem>
      ))}
    </ul>
  );
}

export default MenuGroupList;
