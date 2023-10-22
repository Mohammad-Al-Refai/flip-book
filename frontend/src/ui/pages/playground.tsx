import { useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { Container } from "../components/Container";
import { JSONViewer } from "../components/JSONViewer";
import { JSONEditor } from "../components/JSONEditor";
import { exampleCode } from "../../utils/JSONEditorSchema";
import { Timeline } from "../components/Timeline";
import html2canvas from "html2canvas";
import { Text } from "../components/Text";
import { Upload } from "../../services/Upload";

export function PlaygroundPage() {
  const [code, setCode] = useState(JSON.stringify(exampleCode));
  const [pages, setPages] = useState<string[]>([code]);
  let [indx, setIndx] = useState(0);
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const FPS = 10;

  function onCodeChange(str: string) {
    pages[indx] = str;
    setCode(str);
    setSelectedPage(pages[indx]);
  }
  function onAddNewPage() {
    if (pages.length == 1) {
      pages.push(pages[0]);
    } else {
      pages.push(pages[pages.length - 1]);
      setCode(pages[pages.length - 1]);
      setSelectedPage(pages[pages.length - 1]);
      setIndx(pages.length - 1);
    }
    setPages([...pages]);
  }
  function onSelectPage(i: number) {
    setSelectedPage(pages[i]);
    setCode(pages[i]);
    setIndx(i);
  }
  function onPlayClicked() {
    if (isPlaying) {
      return;
    }
    setIsPlaying(true);
    clearInterval(playTimer);
    indx = -1;
    setIndx(indx);
    setSelectedPage(pages[0]);
    const t = setInterval(() => {
      if (indx == pages.length - 1) {
        indx = -1;
        setIndx(indx);
      }
      indx = indx + 1;
      setIndx(indx);
      setSelectedPage(pages[indx]);
    }, FPS / pages.length);
    setPlayTimer(t);
  }
  function onStopClicked() {
    setIsPlaying(false);
    clearInterval(playTimer);
  }
  function onRenderClicked() {
    if (isRendering) {
      return;
    }
    setIsRendering(true);
    clearInterval(playTimer);
    indx = -1;
    setIndx(indx);
    setSelectedPage(pages[0]);
    const t = setInterval(async () => {
      const data = await toImage();
      images.push(data);
      setImages([...images]);
      if (indx == pages.length - 1) {
        download();
        clearInterval(t);
        return;
      }
      indx = indx + 1;
      setIndx(indx);
      setSelectedPage(pages[indx]);
    }, FPS / pages.length);
  }

  async function toImage() {
    const c = await html2canvas(
      document.getElementById("viewer") as HTMLDivElement
    );
    const canvasData = c.toDataURL("image/png");
    return canvasData.split(",")[1];
  }
  function download() {
    Upload(images, FPS);
  }
  return (
    <AppContainer>
      <Container className="flex w-100 h-80">
        <Container className="w-100 h-100" background="surface2" id="viewer">
          <JSONViewer code={JSON.stringify(selectedPage)} />
        </Container>
        <Container className="w-100 h-100" background="secondary">
          <Text variant="primary" fontSize="L">
            Code
          </Text>
          <JSONEditor
            value={JSON.parse(JSON.stringify(code))}
            onChange={onCodeChange}
          />
        </Container>
      </Container>
      <Container className="w-100 h-20" background="surface">
        <Timeline
          onRenderClicked={onRenderClicked}
          onPlayClicked={onPlayClicked}
          onStopClicked={onStopClicked}
          pages={pages}
          current={indx}
          onAdd={onAddNewPage}
          onChange={onSelectPage}
        />
      </Container>
    </AppContainer>
  );
}
