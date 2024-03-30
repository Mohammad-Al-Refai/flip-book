import { useEffect, useRef, useState } from "react";
import { useGetGif } from "../../../hooks/useGetGif";
import { base64ToBinary, createBlob } from "../../../utils/Base64Utils";

export function usePlaygroundViewModel() {
  const [currentPage, setCurrentPage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pages, setPages] = useState([""]);
  const [hintPages, setHintPages] = useState([""]);
  const [currentHintPage, setCurrentHintPage] = useState("");
  const [curser, setCurser] = useState(0);
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [shouldClearCanvas, setShouldClearCanvas] = useState(false);
  const MIN_PAGES_TO_PROCESS = 3;
  const serviceWorker = useGetGif();
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
    if (curser == pages.length) {
      setCurser((prev) => (prev = 0));
      return;
    }
    setCurrentPage(pages[curser]);
    setCurrentHintPage(hintPages[curser - 1]);
  }, [curser, isPlaying]);

  function onAddNewPage() {
    setPages([...pages, ""]);
    setCurrentPage("");
    setShouldClearCanvas(true);
    setHintPages([...hintPages, pages[pages.length - 1]]);
    setCurser(pages.length);
    if (pages.length > 0) {
      setCurrentHintPage(pages[pages.length - 1]);
    }
  }
  function onClearCanvas() {
    setShouldClearCanvas(false);
  }
  function onSelectPage(index: number) {
    if (pages[pages.length - 1] == "") {
      return;
    }
    setCurser(index);
    setSelectedPage(pages[index]);
    setCurrentPage(pages[index]);
    if (hintPages[index - 1]) {
      setCurrentHintPage(hintPages[index - 1]);
    } else {
      setCurrentHintPage("");
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
    serviceWorker.call(pages);
  }

  function onCanvasChange() {
    const data = toImage();
    setCurrentPage(data);
    pages[curser] = data;
    hintPages[curser] = data;
    setPages([...pages]);
    setHintPages([...hintPages]);
  }
  const isAddDisabled = pages[pages.length - 1] == "";
  const isPlayButtonDisabled =
    isPlaying ||
    pages.length < MIN_PAGES_TO_PROCESS ||
    isRendering ||
    isAddDisabled;
  const isRenderButtonDisabled =
    isPlaying ||
    pages.length < MIN_PAGES_TO_PROCESS ||
    isRendering ||
    isAddDisabled;
  const isStopButtonDisabled = !isPlaying || isRendering;

  return {
    onPlayClicked,
    onPauseClicked,
    onRenderClicked,
    onAddNewPage,
    onSelectPage,
    onCanvasChange,
    onClearCanvas,
    canvasRef,
    curser,
    currentPage,
    currentHintPage,
    selectedPage,
    pages,
    isPlayButtonDisabled,
    isRenderButtonDisabled,
    isStopButtonDisabled,
    shouldClearCanvas,
    isPlaying,
    isAddDisabled,
  };
}
