import { ReactNode } from "react";

export function If({ condition, children }: IfProps) {
  return condition ? children : null;
}

interface IfProps {
  condition: boolean;
  children: ReactNode;
}
