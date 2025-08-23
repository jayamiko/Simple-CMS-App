import { MenuGroup } from "@/store/slices/menuSlice";
import React, { useState } from "react";
import GroupMenus from "./GroupMenus";
import MenuGroupItem from "./MenuGroupItem";

type Props = {
  groups: MenuGroup[];
};

function MenuGroupList({ groups }: Props) {
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
