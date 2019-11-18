import React, { useState, useRef, useEffect, useContext } from "react";

import styled from "styled-components";
import { useCounter } from "../../shared/hooks/useCounter";
import Icon from "../../shared/icons";
import useOnClickOutside from "../../shared/hooks/useOnClickOutside";
import { CartContext } from "../../shared/context/CartContext";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const DEFAULT_MAXIMUM = 5;
const DEFAULT_MINIMUM = 0;

/*  @client doesnt do any type of validation  https://github.com/apollographql/apollo-link-state/issues/205 */
const ADD_TO_CART = gql`
  mutation AddToCart($product: Product!) {
    addToCart(product: $product) @client
  }
`;

const ADD_MANY_TO_CART = gql`
  mutation AddManyToCart($product: Product!, $quantity: Int!) {
    addManyToCart(product: $product, quantity: $quantity) @client
  }
`;
const REMOVE_ONE_FROM_CART = gql`
  mutation RemoveOneFromCart($product: Product!) {
    removeOneFromCart(product: $product) @client
  }
`;

export const Counter = ({ product, quantity = null }) => {
  const [isActive, setIsActive] = useState(false);
  const counterRef = useRef();

  const { count, increment, decrement, setCount } = useCounter(
    quantity || 0,
    DEFAULT_MINIMUM,
    DEFAULT_MAXIMUM
  );

  const [value, setValue] = useState(quantity || count);

  const [addToCart] = useMutation(ADD_TO_CART);
  const [addManyToCart] = useMutation(ADD_MANY_TO_CART);
  const [removeOneFromCart] = useMutation(REMOVE_ONE_FROM_CART, {
    variables: { product }
  });

  useOnClickOutside(counterRef, () => {
    setIsActive(false);
    addManyToCart({ variables: { product, quantity: value } });
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

  const removeQuantity = () => {
    const wasRemoved = decrement();
    if (wasRemoved) {
      removeOneFromCart();
    }
  };

  const addQuantity = () => {
    const wasAdded = increment();
    if (wasAdded) {
      addToCart({ variables: { product } });
    }
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
              onClick={removeQuantity}
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
              onClick={addQuantity}
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
  width: 80%;
  -webkit-appearance: none;
  background-color: transparent;
  color: white;
  height: 24px;
  text-align: center;
  caret-color: whitesmoke;
  outline: none;
  border: none;
`;
