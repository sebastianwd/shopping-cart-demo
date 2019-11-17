import React from "react";

import styled from "styled-components";
import { HeuristicFragmentMatcher } from "apollo-boost";
import { Counter } from "./Counter";

export const Product = ({ product }) => {
  const { name, image, price, id } = product;

  return (
    <>
      <ProductItem>
        <ProductImage src={image} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0.2rem 2rem",
            flex: "1",
            height: "90%"
          }}>
          <ProductName>{name} </ProductName>
          <PriceTag>{price}</PriceTag>
        </div>
        <Counter product={product}></Counter>
      </ProductItem>
    </>
  );
};

const ProductItem = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 2rem;
  position: relative;
`;
const ProductImage = styled.img`
  height: 100px;
`;
const ProductName = styled.h5`
  font-weight: normal;
  font-size: 1rem;
  line-height: 24px;
`;

const PriceTag = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 32px;
  color: #ff2d55;
  margin-top: auto;
  &::before {
    content: "$";
  }
`;
