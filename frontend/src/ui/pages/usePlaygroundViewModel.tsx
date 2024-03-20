import { useEffect, useState } from "react";
import { useGetGif } from "../../hooks/useGetGif";

export function usePlaygroundViewModel() {
  const [currentPage, setCurrentPage] = useState("");
  const [pages, setPages] = useState([""]);
  const [curser, setCurser] = useState(0);
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const serviceWorker = useGetGif();
  const FPS = 30;
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

  function onAddNewPage() {
    setPages([...pages, toImage()]);
    setCurser(pages.length);
  }
  function onSelectPage(index: number) {
    setCurser(index);
    setSelectedPage(pages[index]);
    setCurrentPage(pages[index]);
  }
  function onPlayClicked() {
    setCurser((prev) => (prev = 0));
    setIsPlaying(true);
    setPlayTimer(
      setInterval(() => {
        setCurser((prev) => {
          return prev + 1;
        });
      }, FPS * 10)
    );
  }
  function onStopClicked() {
    setIsPlaying(false);
    clearInterval(playTimer);
  }
  function onRenderClicked() {
    // setCurser((prev) => (prev = 0));
    // setImages([]);
    // setIsRendering(true);
    download();
  }
  function toImage() {
    const c = document.getElementById("defaultCanvas0") as HTMLCanvasElement;
    const canvasData = c.toDataURL("image/png");
    return canvasData.split(",")[1];
  }
  function download() {
    console.log(pages);
    serviceWorker.call(pages);
  }
  function base64ToBinary(base64String: string) {
    const bytes = atob(base64String);
    const binary = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      binary[i] = bytes.charCodeAt(i);
    }
    return new Uint8Array(binary);
  }

  function createBlob(binaryData: any) {
    const blob = new Blob([binaryData], { type: "image/gif" });
    return blob;
  }
  function onCanvasChange() {
    const data = toImage();
    setCurrentPage(data);
    pages[curser] = data;
    setPages([...pages]);
  }
  const isPlayButtonDisabled = isPlaying || pages.length < 3 || isRendering;
  const isRenderButtonDisabled = isPlaying || pages.length < 3 || isRendering;
  const isStopButtonDisabled = !isPlaying || isRendering;
  return {
    onPlayClicked,
    onStopClicked,
    onRenderClicked,
    onAddNewPage,
    onSelectPage,
    onCanvasChange,
    curser,
    currentPage,
    selectedPage,
    pages,
    isPlayButtonDisabled,
    isRenderButtonDisabled,
    isStopButtonDisabled,
  };
}
