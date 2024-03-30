/** @format */

import { useEffect, useState } from "react";

export default function Canvas({
  currentPage,
  onChange,
  previousPage,
  onClear,
  shouldClear,
  canvasRef,
}: CanvasProps) {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(
    undefined
  );
  const [isPainting, setIsPanting] = useState(false);
  useEffect(() => {
    const context = canvasRef.current!.getContext("2d", {
      willReadFrequently: true,
    });
    if (context != null) {
      setCtx(context);
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
    if (previousPage == "") {
      return;
    }
    const previousImage = new Image();
    previousImage.src = toPNGBase64(previousPage);
    ctx!.filter = "opacity(10%)";
    ctx!.drawImage(previousImage, 0, 0);
    ctx!.filter = "none";
  }, [previousPage]);
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
  }

  return (
    <canvas
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      ref={canvasRef}
      width={800}
      height={600}
    />
  );
}
interface CanvasProps {
  onChange: () => void;
  onClear: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  shouldClear: boolean;
  currentPage: string;
  previousPage: string;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
