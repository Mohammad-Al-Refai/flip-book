import { ReactNode } from "react";
import styled from "styled-components";
import { ColorKeys } from "../../theme/ColorKeys";

type variant = keyof ColorKeys;

const StyledElement = styled.button<{ $variant: variant }>`
  cursor: pointer;
  border: 0px solid;
  border-radius: ${(props) => props.theme.surrounding.M};
  padding: ${(props) => props.theme.surrounding.M};
  background-color: ${(props) =>
    props.disabled
      ? props.theme.colors.surface2
      : props.theme.colors[props.$variant]};
  color: ${(props) => {
    if (props.$variant == "primary") {
      return props.theme.colors.onPrimary;
    }
    if (props.$variant == "secondary") {
      return props.theme.colors.onSecondary;
    }
  }};
  font-size: ${(props) => props.theme.fontSizes.M};
  ${(props) => {
    if (!props.disabled) {
      return `&:hover {
    box-shadow: 0px 0px 3px 1px ${props.theme.colors[props.$variant]};
  }`;
    }
  }}
`;
export default function Button({
  children,
  variant,
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <StyledElement
      $variant={variant}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledElement>
  );
}

interface ButtonProps {
  variant: variant;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}
