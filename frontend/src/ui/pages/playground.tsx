import { AppContainer } from "../components/AppContainer";
import { Container } from "../components/Container";
import { JSONViewer } from "../components/JSONViewer";
import { Timeline } from "../components/Timeline";
import { GraphicalElementList } from "../components/Editor/GraphicalElementList";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";

export function PlaygroundPage() {
  const vm = usePlaygroundViewModel();

  return (
    <AppContainer>
      <Container className="flex w-100 h-80">
        <GraphicalElementList />
        <Container
          className="flex justify-content-center align-items-center w-100 h-100"
          background="surface4"
        >
          <JSONViewer i={vm.curser} code={JSON.stringify(vm.selectedPage)} />
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
