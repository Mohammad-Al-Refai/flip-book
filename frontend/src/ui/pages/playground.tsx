/** @format */

import { lazy } from "react";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";

const AppContainer = lazy(() => import("../components/AppContainer"));
const Canvas = lazy(() => import("../components/Canvas"));
const Container = lazy(() => import("../components/Container"));
const Control = lazy(() => import("../components/Control"));
const Timeline = lazy(() => import("../components/Timeline"));

export default function PlaygroundPage() {
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
          <Canvas
            shouldClear={vm.shouldClearCanvas}
            onClear={vm.onClearCanvas}
            canvasRef={vm.canvasRef}
            previousPage={vm.previousPage}
            currentPage={vm.currentPage}
            onChange={vm.onCanvasChange}
          />
        </Container>
      </Container>
    </AppContainer>
  );
}
