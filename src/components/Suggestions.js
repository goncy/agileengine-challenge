import React from "react";
import styled from "styled-components";

import Bar from "./Bar";

const Button = styled.div`
  padding: 6px;
  border: 1px solid lightblue;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: aliceblue;
  }
`;

const Suggestions = ({list, onClick}) =>
  list.length > 0 ? (
    <Bar>
      {list.map((suggestion, index) => (
        <Button key={index} onClick={() => onClick(suggestion)}>
          {suggestion}
        </Button>
      ))}
    </Bar>
  ) : null;

export default Suggestions;
