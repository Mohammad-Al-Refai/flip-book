import styled from "styled-components";

const StyledCurser = styled.div<{
  $background: string;
  $x: number;
  $y: number;
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: ${(props) => props.$background};
  pointer-events: none;
  border-radius: 100%;
`;

export function Curser({ color, x, y }: CurserProps) {
  return (
    <StyledCurser
      style={{
        left: x - 5 + "px",
        top: y - 5 + "px",
      }}
      $background={color}
      $x={x}
      $y={y}
    ></StyledCurser>
  );
}

interface CurserProps {
  color: string;
  x: number;
  y: number;
}
