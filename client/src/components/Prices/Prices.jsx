import React, { useEffect, useState } from "react";
import styled from "styled-components";
import truckIcon from "../../assets/img/truck.svg";
import { GET_CART_ITEMS } from "../../api/resolvers";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { navigate } from "@reach/router";

function getNextBusinessDay(date) {
  date = new Date(+date);
  do {
    date.setDate(date.getDate() + 1);
  } while (!(date.getDay() % 6));
  return date;
}

function formatDate(date) {
  date = new Date(+date);

  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

const normalizeCurrency = amount => {
  const decimalPlaces = 2;
  return Number(
    Math.round(parseFloat(amount + "e" + decimalPlaces)) + "e-" + decimalPlaces
  ).toFixed(decimalPlaces);
};

const INSERT_ORDER = gql`
  mutation insertOrder {
    insertOrder {
      orderNumber
    }
  }
`;

export const Prices = () => {
  const { data } = useQuery(GET_CART_ITEMS);
  const [productsPrice, setProductsPrice] = useState(0.0);
  const [insertOrder] = useMutation(INSERT_ORDER);

  useEffect(() => {
    let partialPrice = 0.0;
    data &&
      data.cart.forEach((item, index) => {
        partialPrice = partialPrice + item.price * item.quantity;
      });
    setProductsPrice(partialPrice);
  }, [data]);

  const processOrder = async () => {
    if (data.cart.length === 0) {
      return;
    }
    let orderNumber = await insertOrder();
    if (orderNumber) {
      navigate("/thankyou", {
        state: { orderNumber }
      });
    }
  };

  return (
    <Wrapper>
      <Title>
        <TruckIcon></TruckIcon>
        <InfoButton>
          Buy now and get it by {formatDate(getNextBusinessDay(new Date()))}
        </InfoButton>
      </Title>
      <Container>
        <Labels>
          <H5>
            Products <Price> {normalizeCurrency(productsPrice)}</Price>
          </H5>
          <H5 highlight>
            Shipping Cost
            <Price> {normalizeCurrency(productsPrice * 0.1)}</Price>
          </H5>
          <H5>
            Taxes<Price> {normalizeCurrency(productsPrice * 0.18)}</Price>
          </H5>
          <br></br>
          <H5 bold>
            Total
            <Price highlight> {normalizeCurrency(productsPrice * 1.1)}</Price>
          </H5>
        </Labels>
      </Container>
      <SubmitButton
        disabled={!(data && data.cart.length > 0)}
        onClick={processOrder}>
        Complete order
      </SubmitButton>
    </Wrapper>
  );
};

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
  background: ${props => (props.disabled ? "#f7f7f7" : "#ff8000")};
  border-radius: 4px;
  text-transform: uppercase;
  padding: 1rem 1.2rem;
  width: 75%;
  color: ${props => (props.disabled ? "#c1c1c1" : "#f7f7f7")};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${props => (props.disabled ? "#c1c1c1" : "transparent")};
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
