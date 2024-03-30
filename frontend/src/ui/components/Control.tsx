import { DrawingTool } from "../../utils/Tools";
import Button from "./Button";
import { ButtonGroup } from "./ButtonGroup";
import Container from "./Container";

export default function Control({
  disableRenderButton,
  onRenderClicked,
  currentTool,
  onToolChange,
}: ControlProps) {
  return (
    <Container
      background="surface3"
      className="w-100 p-l flex align-items-center justify-content-center"
    >
      <ButtonGroup
        current={currentTool}
        items={[DrawingTool.Pencil, DrawingTool.Eraser]}
        onChange={onToolChange}
      />
      <Button
        className="ml-l"
        variant="primary"
        disabled={disableRenderButton}
        onClick={onRenderClicked}
      >
        Export GIF
      </Button>
    </Container>
  );
}
interface ControlProps {
  disableRenderButton: boolean;
  onRenderClicked: () => void;
  currentTool: DrawingTool;
  onToolChange: (tool: DrawingTool) => void;
}
