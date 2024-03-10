import styled from "styled-components";
import { Button } from "./Button";
import { Container } from "./Container";

const StyledTimeline = styled.div`
  padding: ${(props) => props.theme.horizontalSpacing.L};
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledTimelineItem = styled.div<{ highlight: boolean }>`
  width: 50px;
  height: 50px;
  background-color: ${(props) =>
    props.highlight
      ? props.theme.colors.surface4
      : props.theme.colors.secondary};
  border: 1px solid ${(props) => props.theme.colors.onSurface};
  color: ${(props) => props.theme.colors.onSurface};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: ${(props) => props.theme.surrounding.S};
  cursor: pointer;
`;

export function Timeline({
  pages,
  onAdd,
  current,
  onChange,
  onPlayClicked,
  onStopClicked,
  onRenderClicked,
  disablePlayButton,
  disableRenderButton,
  disableStopButton,
}: TimelineProps) {
  return (
    <StyledTimeline>
      <Container className="w-100 m-l flex align-items-center justify-content-center">
        <Button
          className="ml-l"
          variant="primary"
          disabled={disablePlayButton}
          onClick={onPlayClicked}
        >
          Play
        </Button>
        <Button
          className="ml-l"
          disabled={disableStopButton}
          variant="primary"
          onClick={onStopClicked}
        >
          Stop
        </Button>
        <Button
          className="ml-l"
          variant="primary"
          disabled={disableRenderButton}
          onClick={onRenderClicked}
        >
          Render
        </Button>
      </Container>
      <Container className="flex">
        {pages.map((page, i) => (
          <StyledTimelineItem
            key={i}
            highlight={current == i}
            onClick={() => onChange(i)}
          >
            {i}
          </StyledTimelineItem>
        ))}
        <Button className="ml-l" variant="primary" onClick={onAdd}>
          Add
        </Button>
      </Container>
    </StyledTimeline>
  );
}

interface TimelineProps {
  pages: string[];
  onAdd: () => void;
  onChange: (index: number) => void;
  onPlayClicked: () => void;
  onStopClicked: () => void;
  onRenderClicked: () => void;
  current: number;
  disablePlayButton: boolean;
  disableStopButton: boolean;
  disableRenderButton: boolean;
}
