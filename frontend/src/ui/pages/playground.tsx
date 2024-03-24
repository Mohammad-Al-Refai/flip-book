import { AppContainer } from "../components/AppContainer";
import { Canvas } from "../components/Canvas";
import { Container } from "../components/Container";
import { Control } from "../components/Control";
import { Timeline } from "../components/Timeline";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";

export function PlaygroundPage() {
  const vm = usePlaygroundViewModel();

  return (
    <AppContainer>
      <Timeline
        pages={vm.pages}
        current={vm.curser}
        onAdd={vm.onAddNewPage}
        onChange={vm.onSelectPage}
      />

      <Container className="flex column w-100">
        <Control
          disablePlayButton={vm.isPlayButtonDisabled}
          disableRenderButton={vm.isRenderButtonDisabled}
          disableStopButton={vm.isStopButtonDisabled}
          onRenderClicked={vm.onRenderClicked}
          onPlayClicked={vm.onPlayClicked}
          onStopClicked={vm.onStopClicked}
        />
        <Container
          className="flex justify-content-center align-items-center w-100 h-100"
          background="surface4"
        >
          <Canvas page={vm.currentPage} onChange={vm.onCanvasChange} />
        </Container>
      </Container>
    </AppContainer>
  );
}
