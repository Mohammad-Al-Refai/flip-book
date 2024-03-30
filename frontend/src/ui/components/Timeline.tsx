import styled from "styled-components";
import Button from "./Button";
import { If } from "./If";
import { Text } from "./Text";
import { Icons } from "../../utils/Icons";

const StyledTimeline = styled.div`
  padding: ${(props) => props.theme.horizontalSpacing.L};
  display: flex;
  width: 100%;
  min-width: 100px;
  overflow-inline: hidden;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.surface3};
`;
const StyledTimelineItem = styled.div<{ $highlight: boolean }>`
  transition: 0.1s;
  overflow: hidden;
  display: inline;
  border: ${(props) =>
    props.$highlight ? `2px solid ${props.theme.colors.primary}` : "unset"};
  max-height: 70px;
  max-width: 70px;
  min-height: 70px;
  min-width: 70px;
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
  &:hover {
    scale: 1.1;
    box-shadow: 0px 0px 15px 3px #2f2f2f;
  }
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
  overflow-x: auto;
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
  onPlayClicked,
  onPauseClicked,
  isPlaying,
  disableAdd,
  disablePlayButton,
}: TimelineProps) {
  function getSrc(data: string) {
    return "data:image/png;base64," + data;
  }

  return (
    <StyledTimeline>
      <div className="flex align-items-center justify-content-center">
        <If condition={!isPlaying}>
          <Button
            className="ml-l p-m"
            variant="primary"
            disabled={disablePlayButton}
            onClick={onPlayClicked}
          >
            <Text fontSize="L" className={Icons.PLAY} variant="surface3"></Text>
          </Button>
        </If>
        <If condition={isPlaying}>
          <Button
            className="ml-l  p-m"
            variant="primary"
            onClick={onPauseClicked}
          >
            <Text
              fontSize="L"
              className={Icons.PAUSE}
              variant="surface3"
            ></Text>
          </Button>
        </If>
      </div>
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
              <Text fontSize="S" variant="primary">
                Empty
              </Text>
            </If>
          </StyledTimelineItem>
        ))}
        <StyledAdd variant="secondary" disabled={disableAdd} onClick={onAdd}>
          <Text
            className={Icons.ADD_PAGE}
            variant={"onPrimary"}
            fontSize={"L"}
          ></Text>
        </StyledAdd>
      </StyledScrollableContainer>
    </StyledTimeline>
  );
}

interface TimelineProps {
  pages: string[];
  onAdd: () => void;
  onChange: (index: number) => void;
  onPlayClicked: () => void;
  onPauseClicked: () => void;
  disablePlayButton: boolean;
  isPlaying: boolean;
  disableAdd: boolean;
  current: number;
}
