import { useEffect, useRef, useState } from "react";
import { useGetGif } from "../../../hooks/useGetGif";
import { base64ToBinary, createBlob } from "../../../utils/Base64Utils";
import { DrawingTool } from "../../../utils/Tools";

export function usePlaygroundViewModel() {
  const [currentFrame, setCurrentFrame] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frames, setFrames] = useState([""]);
  const [hintFrames, setHintFrames] = useState([""]);
  const [currentHintFrame, setCurrentHintFrame] = useState("");
  const [curser, setCurser] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(frames[0]);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [shouldClearCanvas, setShouldClearCanvas] = useState(false);
  const MIN_FRAMES_TO_PROCESS = 3;
  const serviceWorker = useGetGif();
  const [currentTool, setCurrentTool] = useState(DrawingTool.Pencil);
  const FPS = 100;
  useEffect(() => {
    if (serviceWorker.gifBase64 != "") {
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
    setCurrentFrame(frames[curser]);
  }, [curser, isPlaying]);

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
    setCurser(index);
    setSelectedFrame(frames[index]);
    setCurrentFrame(frames[index]);
    if (hintFrames[index - 1]) {
      setCurrentHintFrame(hintFrames[index - 1]);
    } else {
      setCurrentHintFrame("");
    }
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
  function toImage() {
    const c = canvasRef.current as HTMLCanvasElement;
    const canvasData = c.toDataURL("image/png");
    return canvasData.split(",")[1];
  }
  function download() {
    serviceWorker.call(frames);
  }

  function onCanvasChange() {
    const data = toImage();
    setCurrentFrame(data);
    frames[curser] = data;
    hintFrames[curser] = data;
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
      if (index > curser) {
        setCurser(curser);
        setCurrentHintFrame(newFrames[curser - 1]);
      } else {
        setCurser(curser - 1);
        setCurrentFrame(newFrames[curser - 1]);
        setCurrentHintFrame(newFrames[curser - 2]);
      }
      setHintFrames([...newHintFrames]);
      return [...newFrames];
    });
  }

  function onCopyFrame(index: number) {
    const targetFrame = frames[index];
    const left = frames.slice(0, index);
    const right = frames.slice(index, frames.length);
    const newIndex = left.push(targetFrame);
    const newFrames = [...left, ...right];
    setFrames(() => {
      setCurser(newIndex);
      setCurrentFrame(left[left.length - 1]);
      setCurrentHintFrame(left[left.length - 1]);
      setHintFrames(newFrames);
      return newFrames;
    });
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
    canvasRef,
    curser,
    currentFrame,
    currentHintFrame,
    selectedFrame,
    frames,
    isPlayButtonDisabled,
    isRenderButtonDisabled,
    isStopButtonDisabled,
    shouldClearCanvas,
    isPlaying,
    isAddDisabled,
    currentTool,
  };
}
