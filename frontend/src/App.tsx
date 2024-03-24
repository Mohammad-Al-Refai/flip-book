import { Suspense, lazy } from "react";
import { ThemeContext } from "styled-components";
import { useAppSelector } from "./hooks/useAppSelector";
import GlobalStyle from "./theme/GlobalStyle";
import { Text } from "./ui/components/Text";
import Container from "./ui/components/Container";

const PlaygroundPage = lazy(() => import("./ui/pages/playground"));
function App() {
  const theme = useAppSelector((store) => store.UISlice);

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyle />
      <Suspense
        fallback={
          <Container className="flex align-items-center justify-content-center">
            <Text variant="primary" fontSize="L">
              Loading...
            </Text>
          </Container>
        }
      >
        <PlaygroundPage />
      </Suspense>
    </ThemeContext.Provider>
  );
}

export default App;
