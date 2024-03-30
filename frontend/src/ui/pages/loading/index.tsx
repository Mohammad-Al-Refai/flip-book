import AppContainer from "../../components/AppContainer";
import { Text } from "../../components/Text";

export function LoadingPage() {
  return (
    <AppContainer className="flex align-items-center justify-content-center">
      <Text variant={"secondary"} fontSize={"L"}>
        Loading
      </Text>
    </AppContainer>
  );
}
