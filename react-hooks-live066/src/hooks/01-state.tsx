import { Button } from "@/components/ui/button";
import { useState } from "react";

export function State() {
  const [counter, setCounter] = useState(0);

  function handlePlus() {
    setCounter((prevCounter) => prevCounter + 1);
  }

  function handleMinus() {
    setCounter((prevCounter) => prevCounter - 1);
  }

  return (
    <div>
      <div>Counter: {counter}</div>
      <Button onClick={handlePlus}>+</Button>
      <Button onClick={handleMinus}>-</Button>
    </div>
  );
}
