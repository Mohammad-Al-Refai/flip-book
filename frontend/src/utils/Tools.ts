import { Icons } from "./Icons";

export enum DrawingTool {
  Pencil = "pencil",
  Eraser = "eraser",
}
export function getToolIcon(tool: DrawingTool) {
  switch (tool) {
    case DrawingTool.Pencil:
      return Icons.PENCIL;
    case DrawingTool.Eraser:
      return Icons.ERASER;
    default:
      return Icons.PENCIL;
  }
}
