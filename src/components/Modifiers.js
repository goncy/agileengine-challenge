import React from "react";
import styled from "styled-components";

import Bar from "./Bar";

const Button = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  color: cornsilk;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({selected}) => (selected ? "skyblue" : "lightblue")};

  &:hover {
    background-color: ${({selected}) =>
      selected ? "lightskyblue" : "lightsteelblue"};
  }
`;

const Modifiers = ({list, onClick, selected}) => (
  <Bar>
    {list.map(({tag, label}) => (
      <Button
        key={tag}
        selected={selected === tag}
        onClick={() => onClick(tag)}
      >
        {label}
      </Button>
    ))}
  </Bar>
);

export default Modifiers;
