import { ReactNode } from "react";
import styled from "styled-components";
import { ColorKeys } from "../../theme/ColorKeys";
type variant = keyof ColorKeys;

const StyledElement = styled.div<{ $background?: variant }>`
  overflow: hidden;
  @keyframes anim {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
  animation: anim 2s forwards;
  animation-timing-function: cubic-bezier(0, 0, 0, 1.31);
  background-color: ${(props) => {
    if (props.$background) {
      return props.theme.colors[props.$background];
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
      $background={background}
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
