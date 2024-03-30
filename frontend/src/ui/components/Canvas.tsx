/** @format */

import { useEffect, useRef, useState } from "react";
import { If } from "./If";

export default function Canvas({
  currentPage,
  onChange,
  currentHintPage,
  onClear,
  isPlaying,
  shouldClear,
  canvasRef,
}: CanvasProps) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(
    undefined
  );
  const [previousCtx, setPreviousCtx] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const previousPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPanting] = useState(false);

  useEffect(() => {
    const context = canvasRef.current!.getContext("2d", {
      willReadFrequently: true,
    });
    if (context != null) {
      setCtx(context);
    }
    const previousContext = previousPageCanvasRef.current!.getContext("2d");
    if (previousContext != null) {
      setPreviousCtx(previousContext);
    }
  }, []);

  useEffect(() => {
    if (shouldClear) {
      clear();
      onClear();
    }
  }, [shouldClear]);

  useEffect(() => {
    if (currentPage == "") {
      return;
    }
    const currentImage = new Image();
    currentImage.src = toPNGBase64(currentPage);
    ctx!.drawImage(currentImage, 0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (!currentHintPage) {
      return;
    }
    previousCtx?.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    const hintImage = new Image();
    hintImage.src = toPNGBase64(currentHintPage);
    previousCtx!.drawImage(hintImage, 0, 0);
  }, [currentHintPage]);

  function toPNGBase64(data: string) {
    return "data:image/png;base64," + data;
  }
  useEffect(() => {
    if (ctx == undefined) {
      return;
    }
    clear();
  }, [ctx]);

  function clear() {
    ctx!.fillStyle = "white";
    ctx!.fillRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
  }
  function mouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isPainting) {
      setIsPanting(true);
    }
  }
  function mouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsPanting(false);
    ctx!.stroke();
    ctx!.beginPath();
    // previousCtx!.stroke();
    // previousCtx!.beginPath();
    onChange();
  }
  function mouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isPainting) {
      return;
    }
    ctx!.lineWidth = 2;
    ctx!.lineCap = "round";
    ctx!.lineTo(
      e.clientX - canvasRef.current!.offsetLeft,
      e.clientY - canvasRef.current!.offsetTop
    );
    ctx!.stroke();

    // previousCtx!.lineWidth = 2;
    // previousCtx!.lineCap = "round";
    // previousCtx!.lineTo(
    //   e.clientX - canvasRef.current!.offsetLeft,
    //   e.clientY - canvasRef.current!.offsetTop
    // );
    // previousCtx!.stroke();
  }

  return (
    <>
      <canvas
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        ref={canvasRef}
        width={800}
        height={600}
      />
      <canvas
        className="previous-canvas"
        style={{ display: isPlaying ? "none" : "block" }}
        ref={previousPageCanvasRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        width={800}
        height={600}
      />
    </>
  );
}
interface CanvasProps {
  onChange: () => void;
  onClear: () => void;
  isPlaying: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  shouldClear: boolean;
  currentPage: string;
  currentHintPage: string;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
