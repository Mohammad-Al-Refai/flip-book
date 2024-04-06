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
  currentTool,
  onToolChange,
  onColorChange,
}: ControlProps) {
  return (
    <Container
      background="secondary"
      className="w-100 p-l flex align-items-center justify-content-center"
    >
      <ColorPicker onChange={onColorChange} />
      <ButtonGroup
        current={currentTool}
        items={[DrawingTool.Pencil, DrawingTool.Eraser]}
        onChange={onToolChange}
      />
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
  currentTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
  onColorChange: (color: string) => void;
}
