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
      <h2
        className={`text-white ${color} rounded-t-xl text-center py-3 font-semibold text-sm md:text-base`}
      >
        {title}
      </h2>
      <div className="text-center py-6">
        <span className="font-bold text-xl md:text-2xl">{value}</span>
      </div>
    </div>
  );
}
