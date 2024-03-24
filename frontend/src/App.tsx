import { lazy } from "react";
import { ThemeContext } from "styled-components";
import { useAppSelector } from "./hooks/useAppSelector";
import GlobalStyle from "./theme/GlobalStyle";

const PlaygroundPage = lazy(() => import("./ui/pages/playground"));
function App() {
  const theme = useAppSelector((store) => store.UISlice);

  return (
    <ThemeContext.Provider value={theme}>
      <GlobalStyle />
      <PlaygroundPage />
    </ThemeContext.Provider>
  );
}

export default App;
