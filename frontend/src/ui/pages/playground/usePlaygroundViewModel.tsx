import { useEffect, useState } from "react";
import { useGetGif } from "../../../hooks/useGetGif";
import { base64ToBinary, createBlob } from "../../../utils/Base64Utils";
import { DrawingTool } from "../../../utils/Tools";

export function usePlaygroundViewModel() {
  const [currentFrame, setCurrentFrame] = useState("");
  const [frames, setFrames] = useState([""]);
  const [hintFrames, setHintFrames] = useState([""]);
  const [currentHintFrame, setCurrentHintFrame] = useState("");
  const [curser, setCurser] = useState(0);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [shouldClearCanvas, setShouldClearCanvas] = useState(false);
  const MIN_FRAMES_TO_PROCESS = 3;
  const serviceWorker = useGetGif();
  const [isAddedNewFrame, setIsAddedNewFrame] = useState({
    yes: false,
    index: 0,
  });
  const [isDeletedFrame, setIsDeletedFrame] = useState({
    yes: false,
    index: 0,
  });
  const [currentTool, setCurrentTool] = useState(DrawingTool.Pencil);
  const FPS = 100;
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

  //Track curser & isPlaying to update the currentPage & hintPage
  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (curser == frames.length) {
      setCurser((prev) => (prev = 0));
      return;
    }
    goTo(curser);
  }, [curser, isPlaying]);
  useEffect(() => {
    if (isAddedNewFrame.yes) {
      goTo(isAddedNewFrame.index);
      setIsAddedNewFrame({ yes: false, index: 0 });
    }
  }, [isAddedNewFrame]);
  useEffect(() => {
    if (!isDeletedFrame.yes) {
      return;
    }
    const index = isDeletedFrame.index;
    if (index == 0 && curser == 0) {
      goTo(0);
    }
    if (index == curser && curser == frames.length) {
      goTo(frames.length - 1);
    }
    if (index > 0 && index < frames.length) {
      goTo(index);
    }
    if (index != curser && curser == frames.length) {
      goTo(curser - 1);
    }
    setIsDeletedFrame({
      yes: false,
      index: 0,
    });
  }, [isDeletedFrame, curser, frames]);

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
    goTo(index);
  }
  function onPlayClicked() {
    setCurser((prev) => (prev = 0));
    setIsPlaying(true);
    setPlayTimer(
      setInterval(() => {
        setCurser((prev) => {
          return prev + 1;
        });
      }, FPS)
    );
  }
  function onPauseClicked() {
    setIsPlaying(false);
    clearInterval(playTimer);
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
    setFrames((prev) => {
      const newFrames = frames.filter((_, i) => i != index);
      const newHintFrames = frames.filter((_, i) => i != index);
      setHintFrames([...newHintFrames]);
      return [...newFrames];
    });
    setIsDeletedFrame({
      yes: true,
      index,
    });
  }

  function onCopyFrame(index: number) {
    const targetFrame = frames[index];
    const left = frames.slice(0, index);
    const right = frames.slice(index, frames.length);
    const newIndex = left.push(targetFrame);
    const newFrames = [...left, ...right];
    setFrames(() => {
      setHintFrames(newFrames);
      setIsAddedNewFrame({ yes: true, index: newIndex });
      return newFrames;
    });
  }
  function goTo(index: number) {
    setCurser(index);
    setCurrentFrame(frames[index]);
    if (hintFrames[index - 1]) {
      setCurrentHintFrame(hintFrames[index - 1]);
    } else {
      setCurrentHintFrame("");
    }
  }
  const isAddDisabled = frames[frames.length - 1] == "";
  const isPlayButtonDisabled =
    isPlaying ||
    frames.length < MIN_FRAMES_TO_PROCESS ||
    isRendering ||
    isAddDisabled;
  const isRenderButtonDisabled =
    isPlaying ||
    frames.length < MIN_FRAMES_TO_PROCESS ||
    isRendering ||
    isAddDisabled;
  const isStopButtonDisabled = !isPlaying || isRendering;

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
    isPlaying,
    isAddDisabled,
    isRendering,
    currentTool,
  };
}
