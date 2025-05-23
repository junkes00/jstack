import styled from "styled-components";

export const Nav = styled.nav`
  background: #000;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;

  a {
    color: #fff;
    text-decoration: none;
    display: inline-block;

    // adiciona margin-left sempre que existir um a seguido de outro a
    & + a {
      margin-left: 1rem;
    }
  }
`;
