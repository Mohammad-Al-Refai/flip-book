import styled from "styled-components";
import { ColorPickerColors } from "../../utils/Colors";

const StyledColorPickerContainer = styled.div`
  max-width: 270px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.surface4};
  padding: ${(props) => props.theme.surrounding.XS};
  margin-right: ${(props) => props.theme.surrounding.L};
  background-color: white;
`;

const ColorItem = styled.div<{ $color: string }>`
  border: 1px solid ${(props) => props.$color};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.$color};
  margin: ${(props) => props.theme.surrounding.XS};
  cursor: pointer;
`;
export function ColorPicker({ onChange }: ColorPickerProps) {
  const colors: string[] = [
    ...ColorPickerColors.red,
    ...ColorPickerColors.green,
    ...ColorPickerColors.blue,
  ];
  return (
    <StyledColorPickerContainer>
      {colors.map((color, i) => (
        <ColorItem key={i} $color={color} onClick={() => onChange(color)} />
      ))}
    </StyledColorPickerContainer>
  );
}

interface ColorPickerProps {
  onChange: (color: string) => void;
}
