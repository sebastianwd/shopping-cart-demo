import { useState } from "react";

export const useCounter = (initialCount = 0, minValue, maxValue) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count + 1 > maxValue) {
      return;
    }
    setCount(count => count + 1);
  };
  const decrement = () => {
    if (count - 1 < minValue) {
      return;
    }
    setCount(count => count - 1);
  };

  return { count, increment, decrement, setCount };
};
