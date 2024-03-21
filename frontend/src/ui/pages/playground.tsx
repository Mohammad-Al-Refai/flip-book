import { AppContainer } from "../components/AppContainer";
import { Canvas } from "../components/Canvas";
import { Container } from "../components/Container";
import { Timeline } from "../components/Timeline";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";

export function PlaygroundPage() {
  const vm = usePlaygroundViewModel();

  return (
    <AppContainer>
      <Container className="flex w-100 h-80">
        <Container
          className="flex justify-content-center align-items-center w-100 h-100"
          background="surface4"
        >
          <Canvas page={vm.currentPage} onChange={vm.onCanvasChange} />
        </Container>
      </Container>
      <Container className="w-100 h-20" background="surface">
        <Timeline
          disablePlayButton={vm.isPlayButtonDisabled}
          disableRenderButton={vm.isRenderButtonDisabled}
          disableStopButton={vm.isStopButtonDisabled}
          onRenderClicked={vm.onRenderClicked}
          onPlayClicked={vm.onPlayClicked}
          onStopClicked={vm.onStopClicked}
          pages={vm.pages}
          current={vm.curser}
          onAdd={vm.onAddNewPage}
          onChange={vm.onSelectPage}
        />
      </Container>
    </AppContainer>
  );
}
