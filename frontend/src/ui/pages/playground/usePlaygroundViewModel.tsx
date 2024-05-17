import { useEffect, useState } from "react";
import { useGetGif } from "../../../hooks/useGetGif";
import { base64ToBinary, createBlob } from "../../../utils/Base64Utils";
import { DrawingTool } from "../../../utils/Tools";
import { usePlayController } from "../../../hooks/usePlayController";

export function usePlaygroundViewModel() {
  const [currentFrame, setCurrentFrame] = useState("");
  const [frames, setFrames] = useState([""]);
  const [hintFrames, setHintFrames] = useState([""]);
  const [currentHintFrame, setCurrentHintFrame] = useState("");
  const [curser, setCurser] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [shouldClearCanvas, setShouldClearCanvas] = useState(false);
  const MIN_FRAMES_TO_EXPORT = 3;
  const serviceWorker = useGetGif();
  const [currentTool, setCurrentTool] = useState(DrawingTool.Pencil);
  const playController = usePlayController({
    limit: frames.length,
    delayPerFrame: 500,
    onTick: onTick,
  });
  useEffect(() => {
    if (serviceWorker.gifBase64 != "") {
      setIsRendering(false);
      const base64String = serviceWorker.gifBase64;
      const binaryData = base64ToBinary(base64String);
      const blob = createBlob(binaryData);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.gif";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, [serviceWorker.gifBase64]);

  function onTick(count: number) {
    goToFrameIndex(count);
  }
  function onAddNewFrame() {
    setFrames([...frames, ""]);
    setCurrentFrame("");
    setShouldClearCanvas(true);
    setHintFrames([...hintFrames, frames[frames.length - 1]]);
    setCurser(frames.length);
    if (frames.length > 0) {
      setCurrentHintFrame(frames[frames.length - 1]);
    }
    setCurrentTool(DrawingTool.Pencil);
  }
  function onClearCanvas() {
    setShouldClearCanvas(false);
  }
  function onSelectFrame(index: number) {
    if (frames[frames.length - 1] == "") {
      return;
    }
    goToFrameIndex(index);
  }
  function onPlayClicked() {
    playController.play();
  }
  function onPauseClicked() {
    playController.pause();
  }
  function onRenderClicked() {
    download();
  }

  function download() {
    serviceWorker.call(frames);
    setIsRendering(true);
  }

  function onCanvasChange(newChanges: string) {
    setCurrentFrame(newChanges);
    frames[curser] = newChanges;
    hintFrames[curser] = newChanges;
    setFrames([...frames]);
    setHintFrames([...hintFrames]);
  }
  function onToolChange(tool: DrawingTool) {
    setCurrentTool(tool);
  }
  function onDeleteFrame(index: number) {
    const newFrames = frames.filter((_, i) => i != index);
    const newHintFrames = frames.filter((_, i) => i != index);
    setHintFrames([...newHintFrames]);
    setFrames([...newFrames]);
    if (index == 0 && curser == 0) {
      goToFrameIndex(0);
      return;
    }
    if (index == curser && curser == frames.length) {
      goToFrameIndex(frames.length - 1);
      return;
    }
    // go to first when have only 1 frame
    if (index > 0 && index < frames.length) {
      goToFrameIndex(index - 1);
      return;
    }
    if (index != curser && curser == frames.length) {
      goToFrameIndex(curser - 1);
      return;
    }
  }
  function onCopyFrame(index: number) {
    const targetFrame = frames[index];
    const left = frames.slice(0, index);
    const right = frames.slice(index, frames.length);
    const newIndex = left.push(targetFrame);
    const newFrames = [...left, ...right];
    setHintFrames((_) => [...newFrames]);
    setFrames((_) => [...newFrames]);
    console.log(`${newFrames.length} frames in onCopyFrame`, { newIndex });
    goToFrameIndex(newIndex);
  }

  //Bug: always has outdated frames
  function goToFrameIndex(index: number) {
    console.log(`${frames.length} frames in goToFrameIndex`);
    setCurser(index);
    setCurrentFrame(frames[index]);
    if (hintFrames[index - 1]) {
      setCurrentHintFrame(hintFrames[index - 1] || "");
    } else {
      setCurrentHintFrame("");
    }
  }
  function isCurrentFrameEmpty() {
    return frames[frames.length - 1] == "";
  }
  const isAddDisabled = isCurrentFrameEmpty() || playController.isPlaying;
  const isPlayButtonDisabled =
    playController.isPlaying ||
    frames.length < MIN_FRAMES_TO_EXPORT ||
    isRendering ||
    isAddDisabled;
  const isRenderButtonDisabled =
    playController.isPlaying ||
    frames.length < MIN_FRAMES_TO_EXPORT ||
    isRendering ||
    isAddDisabled;
  const isStopButtonDisabled = !playController.isPlaying || isRendering;
  const isDeleteFrameDisabled =
    playController.isPlaying || isCurrentFrameEmpty() || frames.length < 2;
  const isCopyFrameDisabled =
    playController.isPlaying || frames.length == 0 || isCurrentFrameEmpty();

  return {
    onPlayClicked,
    onPauseClicked,
    onRenderClicked,
    onAddNewFrame,
    onSelectFrame,
    onCanvasChange,
    onClearCanvas,
    onToolChange,
    onDeleteFrame,
    onCopyFrame,
    curser,
    currentFrame,
    currentHintFrame,
    frames,
    isPlayButtonDisabled,
    isRenderButtonDisabled,
    isStopButtonDisabled,
    shouldClearCanvas,
    isPlaying: playController.isPlaying,
    isDeleteFrameDisabled,
    isCopyFrameDisabled,
    isAddDisabled,
    isRendering,
    currentTool,
  };
}
