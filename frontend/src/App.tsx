import { ThemeContext } from "styled-components";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";

import GlobalStyle from "./theme/GlobalStyle";
import { PlaygroundPage } from "./ui/pages/playground";

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
