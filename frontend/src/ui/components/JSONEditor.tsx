import styled from "styled-components";

const StyledJsonEditor = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.surface3};
  border: 0px;
  color: ${(props) => props.theme.colors.onSurface};
  resize: none;
  outline: none;
  font-size: 30px;
`;

export function JSONEditor({ onChange, value }: JSONEditorProps) {
  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange(e.target.value);
  }
  return (
    <StyledJsonEditor
      value={value}
      onChange={handleOnChange}
    ></StyledJsonEditor>
  );
}

interface JSONEditorProps {
  onChange: (code: string) => void;
  value: string;
}
