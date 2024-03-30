import styled from "styled-components";
import { Text } from "./Text";
import { DrawingTool } from "../../utils/Tools";
import { Icons } from "../../utils/Icons";

const StyledGroupContainer = styled.div`
  display: flex;
  width: fit-content;
  overflow: hidden;
  border-radius: 8px;
`;
const StyledGroupItem = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  border: 0px;
  cursor: pointer;
  background-color: ${(props) =>
    props.$isSelected
      ? props.theme.colors.primary
      : props.theme.colors.secondary};
`;

export function ButtonGroup({ items, current, onChange }: ButtonGroupProps) {
  function getToolIcon(tool: DrawingTool) {
    switch (tool) {
      case DrawingTool.Pencil:
        return Icons.PENCIL;
      case DrawingTool.Eraser:
        return Icons.ERASER;
      default:
        return Icons.PENCIL;
    }
  }
  return (
    <StyledGroupContainer>
      {items.map((item, i) => {
        return (
          <StyledGroupItem
            key={item}
            onClick={() => {
              onChange(item);
            }}
            $isSelected={item == current}
          >
            <Text
              className={getToolIcon(item)}
              variant={"onPrimary"}
              fontSize={"M"}
            ></Text>
          </StyledGroupItem>
        );
      })}
    </StyledGroupContainer>
  );
}

interface ButtonGroupProps {
  current: DrawingTool;
  items: DrawingTool[];
  onChange: (item: DrawingTool) => void;
}
