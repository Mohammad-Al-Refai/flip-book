import styled from "styled-components";
import { JSONEditorSchema } from "../../utils/JSONEditorSchema";
import { Text } from "./Text";

const StyledJSONViewer = styled.div`
  overflow: hidden;
  width: 500px;
  height: 500px;
  background-color: white;
`;

export function JSONViewer({ code, i }: JSONViewerProps) {
  if (!isValidJSON(JSON.parse(code))) {
    return (
      <Text variant="primary" fontSize="L">
        invalid JSON
      </Text>
    );
  }
  const parsedCode = JSON.parse(JSON.parse(code)) as JSONEditorSchema;
  return (
    <StyledJSONViewer id="viewer">
      {parsedCode.elements.map((element) => createNewElement(element))}
    </StyledJSONViewer>
  );
}

interface JSONViewerProps {
  i: number;
  code: string;
}

function createNewElement(element: JSONEditorSchema["elements"][0]) {
  const key = window.crypto.randomUUID();
  return <div key={key} style={{ ...element.props }}></div>;
}
function isValidJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}
