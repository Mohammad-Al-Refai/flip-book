import { Button } from "./Button";
import { Container } from "./Container";

export function Control({
  disablePlayButton,
  onPlayClicked,
  disableStopButton,
  onStopClicked,
  disableRenderButton,
  onRenderClicked,
}: ControlProps) {
  return (
    <Container
      background="surface3"
      className="w-100 p-l flex align-items-center justify-content-center"
    >
      <Button
        className="ml-l"
        variant="primary"
        disabled={disablePlayButton}
        onClick={onPlayClicked}
      >
        Play
      </Button>
      <Button
        className="ml-l"
        disabled={disableStopButton}
        variant="primary"
        onClick={onStopClicked}
      >
        Stop
      </Button>
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
  disablePlayButton: boolean;
  disableStopButton: boolean;
  disableRenderButton: boolean;
  onPlayClicked: () => void;
  onStopClicked: () => void;
  onRenderClicked: () => void;
}
