import styled from "styled-components";
import { DrawingTool, getToolIcon } from "../../utils/Tools";

const StyledCurser = styled.div<{
  $background: string;
  $x: number;
  $y: number;
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  color: ${(props) => props.$background};
  pointer-events: none;
  border-radius: 100%;
`;

export function Curser({ color, x, y, tool }: CurserProps) {
  return (
    <StyledCurser
      style={{
        left: x + "px",
        top: y - 15 + "px",
      }}
      $background={color}
      $x={x}
      $y={y}
      className={getToolIcon(tool)}
    ></StyledCurser>
  );
}

interface CurserProps {
  color: string;
  x: number;
  y: number;
  tool: DrawingTool;
}
