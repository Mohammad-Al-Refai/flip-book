import { useEffect, useRef, useState } from "react";
import { toPNGBase64 } from "../../utils/Base64Utils";

export default function Canvas({
  currentPage,
  onChange,
  currentHintPage,
  onClear,
  isPlaying,
  shouldClearEditorLayer,
  editorCanvasRef,
}: CanvasProps) {
  const [editorLayerContext, updateEditorLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const [hintLayerContext, updateHintLayerContext] = useState<
    CanvasRenderingContext2D | undefined
  >(undefined);
  const hintPageCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPanting] = useState(false);

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
  function mouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isPainting) {
      return;
    }
    editorLayerContext!.lineWidth = 2;
    editorLayerContext!.lineCap = "round";
    editorLayerContext!.lineTo(
      e.clientX - editorCanvasRef.current!.offsetLeft,
      e.clientY - editorCanvasRef.current!.offsetTop
    );
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
