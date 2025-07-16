"use client";
import React from "react";

export default function CollectionShimmer() {
  return (
    <section className="text-center px-4 py-10 animate-pulse">
      <div className="h-4 w-40 bg-gray-300 rounded mx-auto mb-2" />
      <div className="h-10 w-3/5 bg-gray-300 rounded mx-auto mb-8" />

      <div className="w-8/12 mx-auto">
        <div className="w-full h-[300px] bg-gray-300 rounded-md shadow-md" />
      </div>

      <div className="mt-8 w-40 h-12 bg-gray-300 rounded mx-auto" />
    </section>
  );
}
