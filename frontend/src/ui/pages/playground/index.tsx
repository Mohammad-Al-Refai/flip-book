import { lazy } from "react";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";

const AppContainer = lazy(() => import("../../components/AppContainer"));
const Canvas = lazy(() => import("../../components/Canvas"));
const Container = lazy(() => import("../../components/Container"));
const Control = lazy(() => import("../../components/Control"));
const Timeline = lazy(() => import("../../components/Timeline"));

export default function PlaygroundPage() {
  const vm = usePlaygroundViewModel();

  return (
    <AppContainer>
      <Container className="flex column w-100">
        <Control
          disableRenderButton={vm.isRenderButtonDisabled}
          onRenderClicked={vm.onRenderClicked}
          currentTool={vm.currentTool}
          onToolChange={vm.onToolChange}
        />
        <Container
          className="flex justify-content-center align-items-center w-100 h-100"
          background="surface4"
        >
          <Canvas
            isPlaying={vm.isPlaying}
            shouldClearEditorLayer={vm.shouldClearCanvas}
            onClear={vm.onClearCanvas}
            editorCanvasRef={vm.canvasRef}
            currentHintPage={vm.currentHintPage}
            currentPage={vm.currentPage}
            currentTool={vm.currentTool}
            onChange={vm.onCanvasChange}
          />
        </Container>
        <Timeline
          pages={vm.pages}
          current={vm.curser}
          disableAdd={vm.isAddDisabled}
          disablePlayButton={vm.isPlayButtonDisabled}
          isPlaying={vm.isPlaying}
          onAdd={vm.onAddNewPage}
          onChange={vm.onSelectPage}
          onPlayClicked={vm.onPlayClicked}
          onPauseClicked={vm.onPauseClicked}
        />
      </Container>
    </AppContainer>
  );
}
