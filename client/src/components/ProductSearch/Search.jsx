import React from "react";
import styled from "styled-components";

export const Search = () => (
  <>
    <Input placeholder={"Search Products"} />
  </>
);

const Input = styled.input`
  padding: 0.8rem 0.9rem;
  width: 100%;
  margin-bottom: 0.8rem;
  border-radius: 4px;
  border: 1px solid #dddddd;
  background: #ffffff;
  font-size: 16px;
`;
