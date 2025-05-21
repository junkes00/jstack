import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.backgroundColor};
    font-family: sans-serif;
  }
`;
