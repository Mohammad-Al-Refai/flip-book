import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { Image } from "p5";

export default function Canvas({ page, onChange }: CanvasProps) {
  function sketch(p5: P5CanvasInstance) {
    let currentColor = "red";
    let isStartDrawing = false;
    let isFinishDrawing = false;
    let isChanged = false;
    let img: Image | undefined = undefined;
    p5.preload = () => {
      if (page != "") {
        p5.loadImage("data:image/png;base64," + page, (image) => {
          img = image;
        });
      }
    };
    p5.setup = () => {
      p5.createCanvas(800, 600);
      p5.background(255);
      p5.colorMode(p5.RGB);
      p5.noStroke();
      if (img != undefined) {
        p5.image(img, 0, 0, img.width, img.height);
      }
    };
    p5.draw = () => {
      if (isMouseNotPressed() && isChanged) {
        isFinishDrawing = true;
        isStartDrawing = false;
      }
      if (isMousePressed()) {
        p5.stroke(currentColor);
        // p5.rect(p5.mouseX, p5.mouseY, 5, 5);
        console.log(p5.pmouseX);
        p5.strokeWeight(10);
        p5.line(p5.mouseX, p5.mouseY, p5.pmouseX, p5.pmouseY);
        isStartDrawing = true;
        isChanged = true;
      }
      if (isChanged && isFinishDrawing) {
        onChange();
        isChanged = false;
        isFinishDrawing = false;
      }
      function isMousePressed() {
        return (
          p5.mouseIsPressed &&
          p5.mouseX > 0 &&
          p5.mouseX < p5.width &&
          p5.mouseY > 0 &&
          p5.mouseY < p5.height
        );
      }
      function isMouseNotPressed() {
        return (
          !p5.mouseIsPressed &&
          p5.mouseX > 0 &&
          p5.mouseX < p5.width &&
          p5.mouseY > 0 &&
          p5.mouseY < p5.height
        );
      }
    };
  }

  return <ReactP5Wrapper sketch={sketch} />;
}
interface CanvasProps {
  onChange: () => void;
  page: string;
}
export interface RectProp {
  x: number;
  y: number;
  color: string;
}
