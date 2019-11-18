import styled from "styled-components";
import React from "react";
import { Link } from "@reach/router";
import IconSuccess from "../assets/img/success.svg";

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
  align-items: center;
  flex-direction: column;
`;

const H4 = styled.h4`
  font-weight: normal;
  margin: 2rem 0;
`;
const StyledLink = styled(Link)`
  color: #0500ff;
`;

const Success = styled.img`
  height: 50%;
  width: 50%;
`;

const ThankYou = props => {
  const orderNumber =
    props.location.state.orderNumber.data.insertOrder.orderNumber;

  return (
    <Wrapper>
      <Container>
        <h1>Thank You</h1>
        <H4>
          Your order <strong>{orderNumber}</strong> has been registered
        </H4>
        <StyledLink to='/'>Continue shopping</StyledLink>

        <Success src={IconSuccess}></Success>
      </Container>
    </Wrapper>
  );
};

export default ThankYou;
