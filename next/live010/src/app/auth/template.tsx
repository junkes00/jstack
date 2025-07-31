"use client";

import { useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [count, setCount] = useState(0);

  return (
    <div className="flex gap-10 w-full">
      <div>
        <button type="button" onClick={() => setCount(count + 1)} className="bg-white text-black">
          Countador:{count}
        </button>
      </div>
      <div className="w-1/2">{children}</div>
      <div className="w-1/2 bg-blue-400">Imagem do app</div>
    </div>
  );
}
