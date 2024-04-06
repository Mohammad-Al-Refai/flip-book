import { lazy } from "react";
import { usePlaygroundViewModel } from "./usePlaygroundViewModel";
import { Dialog } from "../../components/Dialog";
import { Text } from "../../components/Text";

const AppContainer = lazy(() => import("../../components/AppContainer"));
const Canvas = lazy(() => import("../../components/Canvas"));
const Container = lazy(() => import("../../components/Container"));
const Control = lazy(() => import("../../components/Control"));
const Timeline = lazy(() => import("../../components/Timeline"));

export default function PlaygroundPage() {
  const vm = usePlaygroundViewModel();

  return (
    <AppContainer>
      <Dialog isOpen={vm.isRendering}>
        <div className="h-100 flex align-items-center justify-content-center">
          <Text variant={"background"} fontSize={"L"}>
            Rendering
          </Text>
        </div>
      </Dialog>
      <Container className="flex column w-100">
        <Control
          disableRenderButton={vm.isRenderButtonDisabled}
          onRenderClicked={vm.onRenderClicked}
        />
        <Container
          className="flex justify-content-center align-items-center w-100 h-100"
          background="background"
        >
          <Canvas
            isPlaying={vm.isPlaying}
            shouldClearEditorLayer={vm.shouldClearCanvas}
            onClear={vm.onClearCanvas}
            currentHintFrame={vm.currentHintFrame}
            currentFrame={vm.currentFrame}
            onChange={vm.onCanvasChange}
          />
        </Container>
        <Timeline
          frames={vm.frames}
          current={vm.curser}
          disableAdd={vm.isAddDisabled}
          disablePlayButton={vm.isPlayButtonDisabled}
          isPlaying={vm.isPlaying}
          onAdd={vm.onAddNewFrame}
          onChange={vm.onSelectFrame}
          onPlayClicked={vm.onPlayClicked}
          onPauseClicked={vm.onPauseClicked}
          onDeleteFrame={vm.onDeleteFrame}
          onCopyFrame={vm.onCopyFrame}
        />
      </Container>
    </AppContainer>
  );
}
