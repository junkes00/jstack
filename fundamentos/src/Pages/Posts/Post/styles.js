import styled from "styled-components";

export const Container = styled.article`
  background: ${({ theme }) => theme.postBackgroundColor};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};

  h2 {
    margin: 0 0 ${({ theme }) => theme.spacing.small};
  }

  small {
    opacity: 0.7;
  }

  & + article {
    margin-top: ${({ theme }) => theme.spacing.small};
  }
`;
