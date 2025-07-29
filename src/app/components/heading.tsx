import React from "react";

export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl md:text-2xl text-center text-black/50 text-white">
      {children}
    </h2>
  );
}
