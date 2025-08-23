"use client";

import React from "react";

type StatistikCardProps = {
  title: string;
  value: string | number;
  color?: string;
};

export default function StatistikCard({
  title,
  value,
  color = "bg-cyan-700",
}: StatistikCardProps) {
  return (
    <div className="rounded-xl border shadow hover:shadow-md transition">
      <div
        className={`text-white ${color} rounded-t-xl text-center py-3 font-semibold`}
      >
        {title}
      </div>
      <div className="text-3xl font-bold text-center py-6">{value}</div>
    </div>
  );
}
