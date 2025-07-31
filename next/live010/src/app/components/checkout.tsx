"use client";

import { Button } from "./button";

// * It's possible passing component by children 
export function Checkout({ list }: Readonly<{ list: React.ReactNode }>) {
  return (
    <div className="border border-blue-500">
      {list}
      <Button />
    </div>
  );
}
