import { createGlobalStyle } from "styled-components";
import { store } from "../store/store";
import { ColorKeys } from "./ColorKeys";
import { BaseSpacing } from "./DesignTokens";

function initFlex() {
  let css = "";
  css += toClassName("flex", "display:flex;");
  css += toClassName("align-items-center", "align-items:center;");
  css += toClassName("align-items-start", "align-items:start;");
  css += toClassName("align-items-end", "align-items:end;");
  css += toClassName("justify-content-start", "justify-content:start;");
  css += toClassName("justify-content-center", "justify-content:center;");
  css += toClassName("justify-content-end", "justify-content:end;");
  css += toClassName(
    "justify-content-between",
    "justify-content:space-between;"
  );
  css += toClassName("justify-content-evenly", "justify-content:space-evenly;");
  css += toClassName("justify-content-around", "justify-content:space-around;");
  css += toClassName("row", "flex-direction:row;");
  css += toClassName("column", "flex-direction:column;");
  css += toClassName("wrap", "flex-wrap:wrap;");
  css += toClassName("nowrap", "flex-wrap:nowrap;");

  return css;
}

function initGlobalCss() {
  const theme = store.getState().UISlice;
  let css = "";

  //margin
  Object.keys(theme.surrounding).forEach((key) => {
    let value = theme.surrounding[key as keyof BaseSpacing];
    css += toClassName(`m-${key.toLowerCase()}`, `margin:${value};`);
  });

  //margin-top
  Object.keys(theme.verticalSpacing).forEach((key) => {
    let value = theme.verticalSpacing[key as keyof BaseSpacing];
    css += toClassName(`mt-${key.toLowerCase()}`, `margin-top:${value};`);
  });
  //margin-bottom
  Object.keys(theme.verticalSpacing).forEach((key) => {
    let value = theme.verticalSpacing[key as keyof BaseSpacing];
    css += toClassName(`mb-${key.toLowerCase()}`, `margin-bottom:${value};`);
  });
  //margin-left
  Object.keys(theme.horizontalSpacing).forEach((key) => {
    let value = theme.horizontalSpacing[key as keyof BaseSpacing];
    css += toClassName(`ml-${key.toLowerCase()}`, `margin-left:${value};`);
  });

  //margin-right
  Object.keys(theme.horizontalSpacing).forEach((key) => {
    let value = theme.horizontalSpacing[key as keyof BaseSpacing];
    css += toClassName(`mr-${key.toLowerCase()}`, `margin-right:${value};`);
  });

  //padding
  Object.keys(theme.surrounding).forEach((key) => {
    let value = theme.surrounding[key as keyof BaseSpacing];
    css += toClassName(`p-${key.toLowerCase()}`, `padding:${value};`);
  });
  //padding-top
  Object.keys(theme.verticalSpacing).forEach((key) => {
    let value = theme.verticalSpacing[key as keyof BaseSpacing];
    css += toClassName(`pt-${key.toLowerCase()}`, `padding-top:${value};`);
  });
  //padding-bottom
  Object.keys(theme.verticalSpacing).forEach((key) => {
    let value = theme.verticalSpacing[key as keyof BaseSpacing];
    css += toClassName(`pb-${key.toLowerCase()}`, `padding-bottom:${value};`);
  });
  //padding-left
  Object.keys(theme.horizontalSpacing).forEach((key) => {
    let value = theme.horizontalSpacing[key as keyof BaseSpacing];
    css += toClassName(`pl-${key.toLowerCase()}`, `padding-left:${value};`);
  });
  //padding-right
  Object.keys(theme.horizontalSpacing).forEach((key) => {
    let value = theme.horizontalSpacing[key as keyof BaseSpacing];
    css += toClassName(`pr-${key.toLowerCase()}`, `padding-right:${value};`);
  });
  Object.keys(theme.colors).forEach((key) => {
    let value = theme.colors[key as keyof ColorKeys];
    css += toClassName(`bg-${key}`, `background-color:${value};`);
  });
  Object.keys(theme.colors).forEach((key) => {
    let value = theme.colors[key as keyof ColorKeys];
    css += toClassName(`color-${key}`, `color:${value};`);
  });
  //width
  css += toClassName("w-10", "width:10%");
  css += toClassName("w-20", "width:20%");
  css += toClassName("w-30", "width:30%");
  css += toClassName("w-40", "width:40%");
  css += toClassName("w-50", "width:50%");
  css += toClassName("w-60", "width:60%");
  css += toClassName("w-70", "width:70%");
  css += toClassName("w-80", "width:80%");
  css += toClassName("w-90", "width:90%");
  css += toClassName("w-100", "width:100%");
  css += toClassName("w-fit-content", "width:fit-content");

  css += toClassName("h-10", "height:10%");
  css += toClassName("h-20", "height:20%");
  css += toClassName("h-30", "height:30%");
  css += toClassName("h-40", "height:40%");
  css += toClassName("h-50", "height:50%");
  css += toClassName("h-60", "height:60%");
  css += toClassName("h-70", "height:70%");
  css += toClassName("h-80", "height:80%");
  css += toClassName("h-90", "height:90%");
  css += toClassName("h-100", "height:100%");
  css += toClassName("h-fit-content", "width:fit-content");

  //border-radius
  css += toClassName("rounded-1", "border-radius:4px");
  css += toClassName("rounded-2", "border-radius:8px");
  css += toClassName("rounded-3", "border-radius:12px");
  css += toClassName("rounded-4", "border-radius:14px");

  return css;
}

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

canvas {
  position: absolute;
  cursor:none;
}

.hint-canvas{
 visibility: visible;
  opacity: 0.1;
}

.hide-hint-canvas{
 visibility: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
  ${initGlobalCss()}
  ${initFlex()}
`;

function toClassName(name: string, value: string) {
  return `.${name}{
        ${value}
    }`;
}
export default GlobalStyle;
