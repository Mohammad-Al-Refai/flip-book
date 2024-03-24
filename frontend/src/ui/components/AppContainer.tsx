import { ReactNode } from "react";
import styled from "styled-components";

const StyledElement = styled.div`
  background-color: ${(props) => {
    return props.theme.colors.background;
  }};
  width: 100%;
  display: flex;
  height: 100vh;
`;
export function AppContainer({ children }: AppContainerProps) {
  return <StyledElement>{children}</StyledElement>;
}

interface AppContainerProps {
  children: ReactNode;
}
