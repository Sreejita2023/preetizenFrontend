"use client"
import { useState } from "react";

export default function Accordion({ title, content, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-3 text-left text-sm font-medium"
      >
        {title}
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="text-sm pb-3 text-gray-700">{content}</div>}
    </div>
  );
}
