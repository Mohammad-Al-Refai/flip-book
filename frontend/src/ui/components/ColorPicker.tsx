import styled from "styled-components";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { EditorSliceActions } from "../../store/slices/EditorSlice";

const StyledColorPickerColorsContainer = styled.div`
  max-width: 264px;
  display: flex;
  flex-wrap: wrap;
  border-radius: 8px;
`;
const StyledColorPickerContainer = styled.div`
  border-radius: 8px;
  padding: ${(props) => props.theme.surrounding.XS};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  margin-right: ${(props) => props.theme.surrounding.L};
`;

const ColorItem = styled.div<{ $color: string }>`
  border: 1px solid ${(props) => props.theme.colors.background};
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${(props) => props.$color};
  margin: ${(props) => props.theme.surrounding.XS};
  cursor: pointer;
`;
const StyledCustomColorInput = styled.input`
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: none;
  border: 0;
  cursor: pointer;
  width: 50px;
  height: 55px;
  padding: 0;

  &::-webkit-color-swatch {
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.background};
    padding: 0;
  }
`;
export function ColorPicker() {
  const { selectedColor, suggestedColors } = useAppSelector(
    (store) => store.EditorSlice
  );
  const dispatch = useAppDispatch();
  function onCustomColorChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(EditorSliceActions.setSelectedColor(e.target.value));
  }
  return (
    <StyledColorPickerContainer>
      <StyledCustomColorInput
        value={selectedColor}
        type="color"
        onChange={onCustomColorChange}
      />
      <StyledColorPickerColorsContainer>
        {suggestedColors.map((color, i) => (
          <ColorItem
            key={i}
            $color={color}
            onClick={() => dispatch(EditorSliceActions.setSelectedColor(color))}
          />
        ))}
      </StyledColorPickerColorsContainer>
    </StyledColorPickerContainer>
  );
}
