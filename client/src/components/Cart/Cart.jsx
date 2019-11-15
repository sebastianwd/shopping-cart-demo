import React from "react";
import styled from "styled-components";
import truckIcon from "../../assets/img/truck.svg";

export const Cart = () => (
  <Wrapper>
    <Title>
      <TruckIcon></TruckIcon>
      <InfoButton>Buy now and get it by 05/24/19</InfoButton>
    </Title>
    <Container>
      <Labels>
        <H5>
          Products <Price> 234</Price>
        </H5>
        <H5 highlight>
          Shipping Cost<Price> 234</Price>
        </H5>
        <H5>
          Taxes<Price> 234</Price>
        </H5>
        <br></br>
        <H5 bold>
          Total<Price highlight> 234</Price>
        </H5>
      </Labels>
    </Container>
    <SubmitButton>Complete order</SubmitButton>
  </Wrapper>
);

const Container = styled.div`
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  background-color: white;
  width: 75%;
  height: auto;
  margin: 1rem 0;
  min-height: 180px;
`;

const InfoButton = styled.button`
  border-radius: 4px;
  font-size: 16px;
  line-height: 24px;
  display: inline-flex;
  padding: 0.2rem 0.6rem;
`;

const SubmitButton = styled.button`
  background: #ff8000;
  border-radius: 4px;
  text-transform: uppercase;
  padding: 1rem 1.2rem;
  width: 75%;
  color: white;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const TruckIcon = styled.span`
  background-image: url(${truckIcon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 1.3em;
  width: 1.3em;
  display: inline-flex;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding-top: 3.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  max-height: 800px;
`;

const Labels = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  flex-basis: 100%;
  padding: 0 1.5rem;
`;

const H5 = styled.h5`
  font-style: normal;
  font-weight: ${props => (props.bold ? "600" : "normal")};
  font-size: 16px;
  padding: 0.2rem 0;
  line-height: 24px;
  background-color: ${props => (props.highlight ? "yellow" : "transparent")};
`;

const Price = styled.span`
  float: right;
  color: ${props => (props.highlight ? "red" : "black")};
  ::before {
    content: "$";
  }
`;
