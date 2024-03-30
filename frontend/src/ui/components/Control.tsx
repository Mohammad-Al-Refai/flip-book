import Button from "./Button";
import Container from "./Container";

export default function Control({
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
}
