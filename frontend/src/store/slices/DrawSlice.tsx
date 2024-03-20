import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RectProp } from "../../ui/components/Canvas";

export const initialState: initialStateProps = {
  currentPage: <></>,
  pages: [],
};

export const DrawSlice = createSlice({
  name: "DrawSlice",
  initialState: initialState,
  reducers: {
    AddNewPage: (state, payload: PayloadAction<JSX.Element>) => {
      state.pages.push(payload.payload);
    },
    clearCurrentPage: (state, payload: PayloadAction<void>) => {
      state.currentPage = <></>;
    },
    setCurrentPage: (state, payload: PayloadAction<JSX.Element>) => {
      state.currentPage = payload.payload;
    },
  },
});
interface initialStateProps {
  currentPage: JSX.Element;
  pages: JSX.Element[];
}
export const DrawSliceActions = DrawSlice.actions;
