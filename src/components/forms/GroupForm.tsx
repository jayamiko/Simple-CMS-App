"use client";

import React from "react";
import { v4 as uuidv4 } from "uuid";
import FormField from "../inputs/FormField";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useAppDispatch } from "@/hooks/hooks";
import { addGroup, GroupPayload } from "@/store/slices/menuSlice";
import Button from "../buttons/Button";

function GroupForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GroupPayload>();

  const handleAddGroup = (data: GroupPayload) => {
    const name = data.groupName.trim();
    if (!name) return;
    dispatch(addGroup({ id: uuidv4(), name }));
    reset();
  };

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
      onSubmit={handleSubmit(handleAddGroup)}
    >
      <div className="w-full">
        <FormField
          name="groupName"
          type="text"
          placeholder="Enter Group Name"
          isRequired
          register={register("groupName", {
            required: "Group Name is required",
          })}
          error={errors.groupName}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(handleAddGroup)();
            }
          }}
        />
      </div>
      <div className="w-1/5">
        <Button type="submit" variant="info" icon={<FaPlus />}>
          Add Group
        </Button>
      </div>
    </form>
  );
}

export default GroupForm;
