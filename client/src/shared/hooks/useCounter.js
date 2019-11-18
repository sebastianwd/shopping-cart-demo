import { useState } from "react";

export const useCounter = (initialCount = 0, minValue, maxValue) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    if (count + 1 > maxValue) {
      return false;
    }
    setCount(count => count + 1);

    return true;
  };
  const decrement = () => {
    if (count - 1 < minValue) {
      return false;
    }
    setCount(count => count - 1);
    return true;
  };

  return { count, increment, decrement, setCount };
};
