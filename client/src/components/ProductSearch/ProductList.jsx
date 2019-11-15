import React, { useState, useEffect } from "react";
import styled from "styled-components";
import emptyCartIcon from "../../assets/img/empty-cart.svg";

import { products } from "../../shared/data";

export const ProductList = () => {
  const [productsFilter, setProductsFilter] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setProductsFilter(products);
    }
  }, []);

  return (
    <Container isEmpty={productsFilter.length === 0}>
      {productsFilter.map((item, index) => {
        return <div key={index}>{item.name}</div>;
      })}
      {productsFilter.length === 0 && (
        <>
          <Icon src={emptyCartIcon}></Icon>
          <H4>Your cart is empty</H4>
          <H5>Seems like you haven’t chosen what to buy...</H5>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  height: 80%;
  max-height: 800px;
  overflow-y: auto;
  width: 100%;
  border-radius: 4px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${props => (props.isEmpty ? "center" : "initial")};
`;
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
