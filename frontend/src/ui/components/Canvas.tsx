import { useEffect, useRef, useState } from "react";
import { toPNGBase64 } from "../../utils/Base64Utils";
import { Curser } from "./Curser";
import { If } from "./If";
import { DrawingTool } from "../../utils/Tools";

export default function Canvas({
  currentFrame,
  onChange,
  currentHintFrame,
  onClear,
  isPlaying,
  shouldClearEditorLayer,
  editorCanvasRef,
  currentTool,
}: CanvasProps) {
  const [editorLayerContext, updateEditorLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const [hintLayerContext, updateHintLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const [curserPosition, setCurserPosition] = useState({ x: 0, y: 0 });
  const hintPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
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
    if (currentFrame == "") {
      return;
    }
    const currentImage = new Image();
    currentImage.onerror = () => {
      console.log("Error while loading currentImage");
    };
    currentImage.src = toPNGBase64(currentFrame);
    editorLayerContext!.drawImage(currentImage, 0, 0);
  }, [currentFrame]);

  useEffect(() => {
    if (!hintLayerContext) {
      return;
    }
    if (!currentHintFrame) {
      clearHintLayer();
      return;
    }
    const hintImage = new Image();
    hintImage.onerror = () => {
      console.log("Error while loading hintImage");
    };
    hintImage.src = toPNGBase64(currentHintFrame);
    hintLayerContext!.drawImage(hintImage, 0, 0);
  }, [currentHintFrame]);

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
    if (isPlaying) {
      return;
    }
    if (!isMouseDown) {
      setIsMouseDown(true);
    }
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    editorLayerContext!.beginPath();
    editorLayerContext!.moveTo(x, y);
  }
  function mouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
    setIsMouseDown(false);
    editorLayerContext!.beginPath();
    editorLayerContext!.stroke();
    onChange();
  }
  function mouseLeave(e: React.MouseEvent<HTMLCanvasElement>) {
    setMouseInCanvas(false);
  }
  function mouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isMouseInCanvas) {
      setMouseInCanvas(true);
    }
    const curserX = e.clientX;
    const curserY = e.clientY;

    setCurserPosition({
      x: curserX,
      y: curserY,
    });
    if (!isMouseDown) {
      return;
    }
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    editorLayerContext!.lineTo(x, y);
    if (currentTool === DrawingTool.Eraser) {
      editorLayerContext!.strokeStyle = "#fff";
      editorLayerContext!.lineWidth = 30;
    }
    if (currentTool == DrawingTool.Pencil) {
      editorLayerContext!.strokeStyle = color;
      editorLayerContext!.lineWidth = 5;
    }

    editorLayerContext!.lineCap = "round";
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
      <If condition={isMouseInCanvas && !isPlaying}>
        <Curser
          tool={currentTool}
          color={"red"}
          x={curserPosition.x}
          y={curserPosition.y}
        />
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
  currentFrame: string;
  currentHintFrame: string;
  currentTool: DrawingTool;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
