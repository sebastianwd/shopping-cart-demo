import { ProductSearch } from "../components/ProductSearch";
import styled from "styled-components";
import React from "react";
import { Prices } from "../components/Prices/Prices";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f7f7f9;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  max-width: 1600px;
  padding: 4rem 15px 0 15px;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 768px) {
    padding-top: 1rem;
    flex-direction: column;
    height: auto;
  }
`;
const Col = styled.div`
  flex-basis: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Col>
          <ProductSearch></ProductSearch>
        </Col>
        <Col>
          <Prices></Prices>
        </Col>
      </Container>
    </Wrapper>
  );
};

export default Home;
