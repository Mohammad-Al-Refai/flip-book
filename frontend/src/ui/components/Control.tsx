import { useAppDispatch } from "../../hooks/useAppDispatch";
import { EditorSliceActions, useEditor } from "../../store/slices/EditorSlice";
import { Icons } from "../../utils/Icons";
import { DrawingTool } from "../../utils/Tools";
import Button from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import { ColorPicker } from "./ColorPicker";
import Container from "./Container";
import { Text } from "./Text";

export default function Control({
  disableRenderButton,
  onRenderClicked,
}: ControlProps) {
  const dispatch = useAppDispatch();
  const { selectedTool } = useEditor();
  function onToolChange(tool: DrawingTool) {
    dispatch(EditorSliceActions.setSelectedTool(tool));
  }
  return (
    <Container
      background="secondary"
      className="w-100 p-xl flex align-items-center justify-content-between"
    >
      <div className="flex">
        <ColorPicker />
        <ButtonGroup
          current={selectedTool}
          items={[DrawingTool.Pencil, DrawingTool.Eraser]}
          onChange={onToolChange}
        />
      </div>
      <Button
        className="ml-l"
        variant="tertiary"
        disabled={disableRenderButton}
        onClick={onRenderClicked}
      >
        <Text
          className={Icons.GIF}
          variant={"onTertiary"}
          fontSize={"L"}
        ></Text>
      </Button>
    </Container>
  );
}
interface ControlProps {
  disableRenderButton: boolean;
  onRenderClicked: () => void;
}
