import React, { useContext } from "react";
import styled from "styled-components";
import emptyCartIcon from "../../assets/img/empty-cart.svg";
import { CartContext } from "../../shared/context/CartContext";

export const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  return (
    <>
      <Icon src={emptyCartIcon}></Icon>
      <H4>Your cart is empty</H4>
      <H5>Seems like you haven’t chosen what to buy...</H5>
    </>
  );
};

const H4 = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 32px;
  text-align: center;
`;

const H5 = styled.h5`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
`;
