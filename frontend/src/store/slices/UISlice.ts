import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  HorizontalSpacing,
  VerticalSpacing,
  FontSizes,
  Surrounding,
} from "../../theme/DesignTokens";
import { Theme } from "../../theme/Theme";

export const initialState: Theme = {
  isDarkMode: true,
  isLightMode: false,
  horizontalSpacing: {
    XS: HorizontalSpacing.XS,
    S: HorizontalSpacing.S,
    M: HorizontalSpacing.M,
    L: HorizontalSpacing.L,
    XL: HorizontalSpacing.XL,
    XL2: HorizontalSpacing.XL2,
    XL3: HorizontalSpacing.XL3,
    XL4: HorizontalSpacing.XL4,
    XL5: HorizontalSpacing.XL5,
  },
  verticalSpacing: {
    XS: VerticalSpacing.XS,
    S: VerticalSpacing.S,
    M: VerticalSpacing.M,
    L: VerticalSpacing.L,
    XL: VerticalSpacing.XL,
    XL2: VerticalSpacing.XL2,
    XL3: VerticalSpacing.XL3,
    XL4: VerticalSpacing.XL4,
    XL5: VerticalSpacing.XL5,
  },
  fontSizes: {
    XS: FontSizes.XS,
    S: FontSizes.S,
    M: FontSizes.M,
    L: FontSizes.L,
    XL: FontSizes.XL,
    XL2: FontSizes.XL2,
    XL3: FontSizes.XL3,
  },

  colors: {
    primary: "#ee6c4d",
    onPrimary: "white",
    primaryContainer: "#3d5a80",
    onPrimaryContainer: "white",
    secondary: "#161b22",
    onSecondary: "white",
    secondaryContainer: "#f7f6f7",
    onSecondaryContainer: "white",
    background: "#151519",
    onBackground: "#202024",
    surface: "#0d1117",
    surface2: "#3d3c3c",
    surface3: "#30363d",
    surface4: "#929292",
    onSurface: "white",
    tertiary: "#0e7cd9",
    onTertiary: "white",
    tertiaryContainer: "#4d86ee",
    onTertiaryContainer: "white",
    danger: "#FF204E",
    onDanger: "white",
  },
  surrounding: {
    XS: Surrounding.XS,
    S: Surrounding.S,
    M: Surrounding.M,
    L: Surrounding.L,
    XL: Surrounding.XL,
    XL2: Surrounding.XL2,
    XL3: Surrounding.XL3,
    XL4: Surrounding.XL4,
    XL5: Surrounding.XL5,
  },
};

export const UISlice = createSlice({
  name: "UISlice",
  initialState: initialState,
  reducers: {
    switchTheme: (state, payload: PayloadAction<"dark" | "light">) => {
      if (payload.payload == "dark") {
        state.isDarkMode = true;
        state.isLightMode = false;
        state.colors.primary = initialState.colors.onPrimary;
        state.colors.onPrimaryContainer = initialState.colors.primaryContainer;
        state.colors.primaryContainer = initialState.colors.onPrimaryContainer;
        state.colors.secondary = initialState.colors.onSecondary;
        state.colors.background = initialState.colors.onBackground;
        state.colors.surface = initialState.colors.onSurface;
        state.colors.onSurface = initialState.colors.surface;
      }
      if (payload.payload == "light") {
        state.colors = initialState.colors;
      }
    },
  },
});

export const UISliceActions = UISlice.actions;
