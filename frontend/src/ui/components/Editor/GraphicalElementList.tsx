import styled from "styled-components";
import { Container } from "../Container";

const StyledGraphicalElementList = styled.div`
  background-color: red;
`;

export function GraphicalElementList() {
  return (
    <Container className="w-100 h-100" background="surface">
      <StyledGraphicalElementList></StyledGraphicalElementList>
    </Container>
  );
}
