'use client'
import React from "react";
import { useParams } from "next/navigation";

export default function UserProfile() {
  const params = useParams<{ id: string }>();

  return (
    <div className="flex flex-col items-center justify-center text-2xl w-full h-full p-4">
      <h1>UserProfile</h1>
      <hr />
      <p className="text-4xl">
        Profile:{" "}
        <span className="bg-orange-400">
          {params.id}
        </span>
      </p>
    </div>
  );
}
