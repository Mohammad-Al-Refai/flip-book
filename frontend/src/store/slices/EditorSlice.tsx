import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DrawingTool } from "../../utils/Tools";
import { ColorPickerColors } from "../../utils/Colors";
import { useAppSelector } from "../../hooks/useAppSelector";

export const initialState: initialStateProps = {
  selectedColor: ColorPickerColors[0],
  frames: [""],
  selectedTool: DrawingTool.Pencil,
  suggestedColors: ColorPickerColors,
};

export const EditorSlice = createSlice({
  name: "EditorSlice",
  initialState: initialState,
  reducers: {
    setSelectedColor: (state, payload: PayloadAction<string>) => {
      state.selectedColor = payload.payload;
    },
    setSelectedTool: (state, payload: PayloadAction<DrawingTool>) => {
      state.selectedTool = payload.payload;
    },
    setFrames: (state, payload: PayloadAction<string[]>) => {
      state.frames = payload.payload;
    },
  },
});
interface initialStateProps {
  selectedColor: string;
  frames: string[];
  selectedTool: DrawingTool;
  suggestedColors: string[];
}
export function useEditor() {
  const props = useAppSelector((store) => store.EditorSlice);
  return { ...props };
}
export const EditorSliceActions = EditorSlice.actions;
