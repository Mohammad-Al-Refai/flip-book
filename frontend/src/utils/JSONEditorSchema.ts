import { CSSProperties } from "styled-components";

export interface JSONEditorSchema {
  elements: JSONElement[];
}

interface JSONElement {
  name: string;
  props: CSSProperties;
}

export const exampleCode: JSONEditorSchema = {
  elements: [
    {
      name: "Line1",
      props: {
        backgroundColor: "red",
        width: "20px",
        height: "20px",
        borderRadius: "100px",
        transform: "translate(0%,0%)",
      },
    },
  ],
};
