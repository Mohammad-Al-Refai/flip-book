import styled from "styled-components";

const AppContainer = styled.div`
  background-color: ${(props) => {
    return props.theme.colors.background;
  }};
  width: 100%;
  display: flex;
  height: 100vh;
`;

export default AppContainer;
