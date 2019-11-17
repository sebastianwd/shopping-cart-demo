import React, { useState, useRef, useEffect, useContext } from "react";

import styled from "styled-components";
import { useCounter } from "../../shared/hooks/useCounter";
import Icon from "../../shared/icons";
import useOnClickOutside from "../../shared/hooks/useOnClickOutside";
import { CartContext } from "../../shared/context/CartContext";
import { useApolloClient } from "@apollo/react-hooks";

const DEFAULT_MAXIMUM = 5;
const DEFAULT_MINIMUM = 0;

export const Counter = ({ product }) => {
  const [isActive, setIsActive] = useState(false);
  const counterRef = useRef();
  const [cart, setCart] = useContext(CartContext);
  const { count, increment, decrement, setCount } = useCounter(
    0,
    DEFAULT_MINIMUM,
    DEFAULT_MAXIMUM
  );

  const [value, setValue] = useState(count);

  useOnClickOutside(counterRef, () => {
    setIsActive(false);
    addToCart();
  });

  useEffect(() => {
    setValue(count);
  }, [count]);

  const handleChange = e => {
    if (e.currentTarget.value === "") {
      setValue("");
      return;
    }
    if (
      Number.isInteger(parseInt(e.currentTarget.value)) ||
      e.currentTarget.value === ""
    ) {
      setCount(parseInt(e.currentTarget.value));
    }
  };
  const addToCart = () => {
    setCart(cart => {
      return [...cart, product];
    });
  };

  return (
    <>
      {!isActive && (
        <Circle onClick={() => setIsActive(true)}>
          <IconPlus>{count === 0 ? "+" : count}</IconPlus>
        </Circle>
      )}
      {isActive && (
        <>
          <Knob ref={counterRef}>
            <Icon.Minus
              onClick={decrement}
              style={{
                height: "24px",
                width: "24px",
                cursor: "pointer"
              }}></Icon.Minus>
            <QuantityInput
              maxLength={1}
              value={value}
              onChange={handleChange}
              type={"text"}
            />
            <Icon.Plus
              onClick={increment}
              style={{
                height: "24px",
                width: "24px",
                cursor: "pointer"
              }}></Icon.Plus>
          </Knob>
          <Overlay></Overlay>
        </>
      )}
    </>
  );
};

const Knob = styled.div`
  padding: 1rem;
  background-color: #ff8000;
  border-radius: 4px;
  width: 176px;
  height: 48px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  outline: none;
  z-index: 5;
`;
const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.788);
  z-index: 4;
`;

const Circle = styled.button`
  background-color: #ff8000;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  &:active {
    background-color: #ff6001;
  }
`;
const IconPlus = styled.span`
  font-size: 2rem;
  color: whitesmoke;
`;

const QuantityInput = styled.input`
  font-size: 1.4rem;
  width: 100%;
  -webkit-appearance: none;
  background-color: transparent;
  color: white;
  height: 24px;
  text-align: center;
  caret-color: whitesmoke;
  outline: none;
  border: none;
`;
