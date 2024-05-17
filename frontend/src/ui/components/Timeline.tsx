import styled from "styled-components";
import Button from "./Button";
import { If } from "./If";
import { Text } from "./Text";
import { Icons } from "../../utils/Icons";

const StyledTimeline = styled.div`
  display: flex;
  width: 100%;
  min-width: 100px;
  overflow-inline: hidden;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.onBackground};
`;

const StyledTimelineItem = styled.div<{ $highlight: boolean }>`
  transition: 0.1s;
  display: inline;
  border: ${(props) =>
    props.$highlight ? `3px solid ${props.theme.colors.primary}` : "unset"};
  max-height: 70px;
  max-width: 70px;
  min-height: 70px;
  min-width: 70px;
  background-color: ${(props) => props.theme.colors.onSurface};
  color: ${(props) => props.theme.colors.onSurface};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  margin: ${(props) => props.theme.surrounding.S};
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
  margin-block: ${(props) => props.theme.surrounding.XL2};
  margin-inline: ${(props) => props.theme.surrounding.XL};
`;
const StyledPreviewImage = styled.img`
  width: 100%;
  height: 100%;
`;
const StyledTimelineItemsActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.surrounding.M};
`;
export default function Timeline({
  frames,
  onAdd,
  current,
  onChange,
  onPlayClicked,
  onPauseClicked,
  onCopyFrame,
  onDeleteFrame,
  isPlaying,
  disableAdd,
  disablePlayButton,
  disableCopy,
  disableDelete,
}: TimelineProps) {
  function getSrc(data: string) {
    return "data:image/png;base64," + data;
  }

  return (
    <StyledTimeline>
      <StyledTimelineItemsActionsContainer>
        <div className="w-50">
          <Button
            className="ml-l p-m"
            variant="tertiary"
            disabled={disableCopy}
            onClick={() => onCopyFrame(current)}
          >
            <Text
              fontSize="S"
              className={Icons.COPY}
              variant="onTertiary"
            ></Text>
          </Button>
          <Button
            className="ml-l p-m"
            variant="danger"
            disabled={disableDelete}
            onClick={() => onDeleteFrame(current)}
          >
            <Text
              fontSize="S"
              className={Icons.DELETE}
              variant="onDanger"
            ></Text>
          </Button>
        </div>
        <div className="flex align-items-center justify-content-start w-50">
          <If condition={!isPlaying}>
            <Button
              className="p-m"
              variant="primary"
              disabled={disablePlayButton}
              onClick={onPlayClicked}
            >
              <Text
                fontSize="L"
                className={Icons.PLAY}
                variant="onPrimary"
              ></Text>
            </Button>
          </If>
          <If condition={isPlaying}>
            <Button className="p-m" variant="primary" onClick={onPauseClicked}>
              <Text
                fontSize="L"
                className={Icons.PAUSE}
                variant="onPrimary"
              ></Text>
            </Button>
          </If>
        </div>
      </StyledTimelineItemsActionsContainer>
      <StyledScrollableContainer>
        {frames.map((page, i) => (
          <StyledTimelineItem key={i} $highlight={current == i}>
            <If condition={page != ""}>
              <StyledPreviewImage
                onClick={() => {
                  if (isPlaying) {
                    return;
                  }
                  onChange(i);
                }}
                src={getSrc(page)}
              />
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
  frames: string[];
  onAdd: () => void;
  onChange: (index: number) => void;
  onPlayClicked: () => void;
  onPauseClicked: () => void;
  onDeleteFrame: (index: number) => void;
  onCopyFrame: (index: number) => void;
  disablePlayButton: boolean;
  isPlaying: boolean;
  disableAdd: boolean;
  disableCopy: boolean;
  disableDelete: boolean;
  current: number;
}
