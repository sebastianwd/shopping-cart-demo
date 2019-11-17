import React, { useState, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useLazyQuery } from "@apollo/react-hooks";
import { useDebouncedCallback } from "use-debounce";
import Cart from "../Cart";
import ProductItem from "../Product";

const SEARCH_PRODUCTS = gql`
  query searchProducts($name: String!) {
    searchProducts(name: $name) {
      id
      name
      price
      image
    }
  }
`;

export const ProductSearch = () => {
  const [searchProducts, { loading, data }] = useLazyQuery(SEARCH_PRODUCTS);
  const [productsFilter, setProductsFilter] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);

  /* runs every time data changes / api call executes */
  useEffect(() => {
    if (data && data.searchProducts) {
      setProductsFilter(data.searchProducts);
    }
  }, [data]);

  /* debounce value to prevent unnecesary api calls */
  const [debouncedCallback] = useDebouncedCallback(value => {
    /* if search query is empty */
    if (!value) {
      setIsEmpty(true);
      setProductsFilter([]);
      return;
    }
    /* otherwise execute search */
    setIsEmpty(false);
    searchProducts({ variables: { name: value } });
  }, 200);

  return (
    <>
      <Input
        placeholder={"Search Products"}
        onChange={e => debouncedCallback(e.currentTarget.value)}
      />
      <Container isEmpty={productsFilter.length === 0}>
        {productsFilter.map((product, index) => {
          return (
            <ProductItem.Product
              key={product.id}
              product={product}></ProductItem.Product>
          );
        })}
        {productsFilter.length === 0 && !isEmpty && <p> No results found</p>}
        {productsFilter.length === 0 && isEmpty && <Cart></Cart>}
      </Container>
    </>
  );
};

const Input = styled.input`
  padding: 0.8rem 0.9rem;
  width: 100%;
  margin-bottom: 0.8rem;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background: #ffffff;
  font-size: 16px;
`;

const Container = styled.div`
  background-color: white;
  height: 80%;
  min-height: 400px;
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
