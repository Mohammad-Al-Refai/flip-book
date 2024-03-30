import { useEffect, useRef, useState } from "react";
import { toPNGBase64 } from "../../utils/Base64Utils";
import { Curser } from "./Curser";
import { If } from "./If";

export default function Canvas({
  currentPage,
  onChange,
  currentHintPage,
  onClear,
  isPlaying,
  shouldClearEditorLayer,
  editorCanvasRef,
}: CanvasProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [editorLayerContext, updateEditorLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const [hintLayerContext, updateHintLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const hintPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPanting] = useState(false);
  const color = "red";
  const lineWidth = 2;
  const [isMouseInCanvas, setMouseInCanvas] = useState(false);
  useEffect(() => {
    const context = editorCanvasRef.current!.getContext("2d", {
      willReadFrequently: true,
    });
    if (context != null) {
      updateEditorLayerContext(context);
    }
    const hintCtx = hintPageCanvasRef.current!.getContext("2d");
    if (hintCtx != null) {
      updateHintLayerContext(hintCtx);
    }
  }, []);

  useEffect(() => {
    if (shouldClearEditorLayer) {
      clearEditorLayer();
      onClear();
    }
  }, [shouldClearEditorLayer]);

  useEffect(() => {
    if (currentPage == "") {
      return;
    }
    const currentImage = new Image();
    currentImage.src = toPNGBase64(currentPage);
    editorLayerContext!.drawImage(currentImage, 0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (!hintLayerContext) {
      return;
    }
    if (!currentHintPage) {
      clearHintLayer();
      return;
    }
    const hintImage = new Image();
    hintImage.src = toPNGBase64(currentHintPage);
    hintLayerContext!.drawImage(hintImage, 0, 0);
  }, [currentHintPage]);

  useEffect(() => {
    if (editorLayerContext == undefined) {
      return;
    }
    clearEditorLayer();
  }, [editorLayerContext]);

  function clearEditorLayer() {
    editorLayerContext!.fillStyle = "white";
    editorLayerContext!.fillRect(
      0,
      0,
      editorCanvasRef.current!.width,
      editorCanvasRef.current!.height
    );
  }
  function clearHintLayer() {
    hintLayerContext!.reset();
  }
  function mouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isPainting) {
      setIsPanting(true);
    }
  }
  function mouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsPanting(false);
    editorLayerContext!.stroke();
    editorLayerContext!.beginPath();
    onChange();
  }
  function mouseLeave(e: React.MouseEvent<HTMLCanvasElement>) {
    setMouseInCanvas(false);
  }
  function mouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    const x = e.clientX - editorCanvasRef.current!.offsetLeft;
    const y = e.clientY - editorCanvasRef.current!.offsetTop;
    setX(e.clientX);
    setY(e.clientY);
    if (!isMouseInCanvas) {
      setMouseInCanvas(true);
    }
    if (!isPainting) {
      return;
    }

    editorLayerContext!.lineWidth = lineWidth;
    editorLayerContext!.lineCap = "round";
    editorLayerContext!.strokeStyle = color;
    editorLayerContext!.lineTo(x, y);
    editorLayerContext!.stroke();
  }

  return (
    <>
      <canvas
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        ref={editorCanvasRef}
        width={800}
        height={600}
      />
      <canvas
        className={isPlaying ? "hide-hint-canvas" : "hint-canvas"}
        ref={hintPageCanvasRef}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
        onMouseOut={mouseLeave}
        width={800}
        height={600}
      />
      <If condition={isMouseInCanvas}>
        <Curser color={"red"} x={x} y={y} />
      </If>
    </>
  );
}
interface CanvasProps {
  onChange: () => void;
  onClear: () => void;
  isPlaying: boolean;
  editorCanvasRef: React.RefObject<HTMLCanvasElement>;
  shouldClearEditorLayer: boolean;
  currentPage: string;
  currentHintPage: string;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
