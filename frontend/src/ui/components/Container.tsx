import { ReactNode } from "react";
import styled from "styled-components";
import { ColorKeys } from "../../theme/ColorKeys";
type variant = keyof ColorKeys;

const StyledElement = styled.div<{ background?: variant }>`
  overflow: hidden;
  background-color: ${(props) => {
    if (props.background) {
      return props.theme.colors[props.background];
    }
  }};
`;
export default function Container({
  children,
  background,
  className,
  id,
}: ContainerProps) {
  return (
    <StyledElement
      background={background}
      id={id}
      className={className ? className : ""}
    >
      {children}
    </StyledElement>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
  background?: variant;
  id?: string;
}
