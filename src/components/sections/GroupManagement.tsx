import React from "react";
import GroupForm from "../forms/GroupForm";
import MenuGroupList from "../menu/MenuGroupList";

function GroupManagement() {
  return (
    <section className="rounded-2xl border p-4 sm:p-6 shadow-sm">
      <GroupForm />
      <MenuGroupList />
    </section>
  );
}

export default GroupManagement;
