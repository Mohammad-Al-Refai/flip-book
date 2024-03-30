import styled from "styled-components";
import Button from "./Button";
import { If } from "./If";
import { Text } from "./Text";

const StyledTimeline = styled.div`
  padding: ${(props) => props.theme.horizontalSpacing.L};
  height: 100vh;
  display: flex;
  width: 25%;
  min-width: 100px;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.surface3};
`;
const StyledTimelineItem = styled.div<{ $highlight: boolean }>`
  filter: ${(props) => (props.$highlight ? "contrast(50%);" : "unset")};
  overflow: hidden;
  display: inline;
  max-height: 200px;
  max-width: 200px;
  min-height: 200px;
  min-width: 200px;
  background-color: ${(props) =>
    props.$highlight
      ? props.theme.colors.secondary
      : props.theme.colors.surface4};
  color: ${(props) => props.theme.colors.onSurface};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: ${(props) => props.theme.surrounding.S};
  cursor: pointer;
`;
const StyledAdd = styled(Button)`
  background-color: ${(props) => props.theme.colors.primary};
  width: 50px;
  height: 50px;
  margin: ${(props) => props.theme.surrounding.S};
  color: ${(props) => props.theme.colors.onPrimary};
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledScrollableContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
`;
const StyledPreviewImage = styled.img`
  width: 100%;
  height: 100%;
`;
export default function Timeline({
  pages,
  onAdd,
  current,
  onChange,
  disableAdd,
}: TimelineProps) {
  function getSrc(data: string) {
    return "data:image/png;base64," + data;
  }

  return (
    <StyledTimeline>
      <StyledScrollableContainer>
        {pages.map((page, i) => (
          <StyledTimelineItem
            key={i}
            $highlight={current == i}
            onClick={() => onChange(i)}
          >
            <If condition={page != ""}>
              <StyledPreviewImage src={getSrc(page)} />
            </If>
            <If condition={page == ""}>
              <Text fontSize="M" variant="primary">
                Draw to see changes
              </Text>
            </If>
          </StyledTimelineItem>
        ))}
        <StyledAdd variant="primary" disabled={disableAdd} onClick={onAdd}>
          +
        </StyledAdd>
      </StyledScrollableContainer>
    </StyledTimeline>
  );
}

interface TimelineProps {
  pages: string[];
  onAdd: () => void;
  onChange: (index: number) => void;
  disableAdd: boolean;
  current: number;
}
