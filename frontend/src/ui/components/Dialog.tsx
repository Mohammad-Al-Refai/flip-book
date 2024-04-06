import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  padding: ${(props) => props.theme.surrounding.XL};
  width: 30%;
  height: 30%;
  border: 0;
  border-radius: 8px;
  background-color: #0000001f;
  transform: translate(35vw, 100%);
  outline: unset;
  &::backdrop {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    background-color: transparent;
    backdrop-filter: blur(5px);
  }
`;

export function Dialog({ isOpen, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    dialogRef.current.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    });
  }, [dialogRef]);
  useEffect(() => {
    if (!dialogRef.current) {
      return;
    }
    if (isOpen) {
      dialogRef.current.showModal();
    }
    if (dialogRef.current.open && !isOpen) {
      dialogRef.current.close();
    }
  }, [isOpen]);
  return <StyledDialog ref={dialogRef}>{children}</StyledDialog>;
}
interface DialogProps {
  children: ReactNode;
  isOpen: boolean;
}
