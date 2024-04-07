import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const StyledDialog = styled.dialog`
  padding: ${(props) => props.theme.surrounding.XL};
  width: 30%;
  max-width: 400px;
  max-height: 300px;
  height: 30%;
  border: 0;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.secondary};
  transform: translate(40vw, 100%);
  outline: unset;
  &::backdrop {
    opacity: 1;
    background-color: transparent;
    backdrop-filter: blur(5px);
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.2s ease-in-out forwards;
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
