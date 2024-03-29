import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Image } from "p5";
import { useEffect, useRef, useState } from "react";

export default function Canvas({
  currentPage,
  onChange,
  previousPage,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(new HTMLCanvasElement());
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(
    undefined
  );
  useEffect(() => {
    const context = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });
    if (context != null) {
      setCtx(context);
    }
  }, []);
  function toPNGBase64(data: string) {
    return "data:image/png;base64," + data;
  }
  useEffect(() => {
    if (ctx == undefined) {
      return;
    }
    clearBackground(ctx);
  }, [ctx]);

  function clearBackground(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }
  function mouseDownEventHandler(e: React.MouseEvent<HTMLCanvasElement>) {
    // paint = true;
    var x = e.pageX - canvasRef.current.offsetLeft;
    var y = e.pageY - canvasRef.current.offsetTop;
    //  ctx.re
  }
  // function (params:type) {

  // }
  // function sketch(p5: P5CanvasInstance) {
  //   let currentColor = "red";
  //   let isStartDrawing = false;
  //   let isFinishDrawing = false;
  //   let isChanged = false;
  //   let currentImage: Image | undefined = undefined;
  //   let previousImage: Image | undefined = undefined;
  //   console.log({
  //     currentPage,
  //     previousPage,
  //   });
  //   p5.preload = () => {
  //     if (currentPage != "") {
  //       p5.loadImage(toPNGBase64(currentPage), (image) => {
  //         currentImage = image;
  //       });
  //     }
  //     if (previousPage != "") {
  //       p5.loadImage(toPNGBase64(previousPage), (image) => {
  //         previousImage = image;
  //       });
  //     }
  //   };
  //   p5.setup = () => {
  //     p5.createCanvas(800, 600);
  //     p5.background(255);
  //     p5.colorMode(p5.RGB);
  //     p5.noStroke();
  //     if (currentImage != undefined) {
  //       p5.image(currentImage, 0, 0, currentImage.width, currentImage.height);
  //     }
  //   };
  //   p5.draw = () => {
  //     if (previousImage != undefined && !isChanged && !isFinishDrawing) {
  //       p5.alpha("0");
  //       // p5.tint(255, 50);
  //       p5.image(
  //         previousImage,
  //         0,
  //         0,
  //         previousImage.width,
  //         previousImage.height
  //       );
  //     }
  //     if (isMouseNotPressed() && isChanged) {
  //       isFinishDrawing = true;
  //       isStartDrawing = false;
  //     }
  //     if (isMousePressed()) {
  //       p5.stroke(currentColor);
  //       p5.strokeWeight(10);
  //       p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
  //       isStartDrawing = true;
  //       isChanged = true;
  //     }
  //     if (isChanged && isFinishDrawing) {
  //       onChange();
  //       isChanged = false;
  //       isFinishDrawing = false;
  //     }
  //     function isMousePressed() {
  //       return (
  //         p5.mouseIsPressed &&
  //         p5.mouseX > 0 &&
  //         p5.mouseX < p5.width &&
  //         p5.mouseY > 0 &&
  //         p5.mouseY < p5.height
  //       );
  //     }
  //     function isMouseNotPressed() {
  //       return (
  //         !p5.mouseIsPressed &&
  //         p5.mouseX > 0 &&
  //         p5.mouseX < p5.width &&
  //         p5.mouseY > 0 &&
  //         p5.mouseY < p5.height
  //       );
  //     }
  //   };
  // }

  return (
    <canvas
      onMouseDown={mouseDownEventHandler}
      ref={canvasRef}
      width={800}
      height={600}
    />
  );
}
interface CanvasProps {
  onChange: () => void;
  currentPage: string;
  previousPage: string;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
