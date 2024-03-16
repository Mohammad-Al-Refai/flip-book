/** @format */

import { useEffect, useState } from "react";
import { AppContainer } from "../components/AppContainer";
import { Container } from "../components/Container";
import { JSONViewer } from "../components/JSONViewer";
import { JSONEditor } from "../components/JSONEditor";
import { exampleCode } from "../../utils/JSONEditorSchema";
import { Timeline } from "../components/Timeline";
import html2canvas from "html2canvas";
import { Text } from "../components/Text";
import { useGetGif } from "../../hooks/useGetGif";

export function PlaygroundPage() {
  const [currentPageCode, setCurrentPageCode] = useState(
    JSON.stringify(exampleCode)
  );
  const [pages, setPages] = useState<string[]>([currentPageCode]);
  const [curser, setCurser] = useState(0);
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [playTimer, setPlayTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderTimer, setRenderTimer] = useState(0);
  const [isRendering, setIsRendering] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const serviceWorker = useGetGif();
  const FPS = 30;
  useEffect(() => {
    if (serviceWorker.gifBase64 != "") {
      const base64String = serviceWorker.gifBase64;
      const binaryData = base64ToBinary(base64String);
      const blob = createBlob(binaryData);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image.gif";
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }, [serviceWorker.gifBase64]);
  useEffect(() => {
    // When hit the limit of pages
    if (isPlaying && curser == pages.length) {
      clearInterval(playTimer);
      setIsPlaying(false);
      setPlayTimer(0);
      setCurser(0);
      setCurrentPageCode((prev) => {
        prev = pages[0];
        setSelectedPage(prev);
        return prev;
      });

      return;
    }
    //Update page while playing
    if (isPlaying || isRendering) {
      setSelectedPage(pages[curser]);
      setCurrentPageCode(pages[curser]);
    }
    if (isRendering) {
      toImage().then((base64) => {
        setImages([...images, base64]);
      });
    }
    if (isRendering && curser == pages.length) {
      clearInterval(renderTimer);
      setIsPlaying(false);
      setRenderTimer(0);
      setIsRendering(false);
      setCurser(0);
      setCurrentPageCode((prev) => {
        prev = pages[0];
        setSelectedPage(prev);
        return prev;
      });
      download();
    }
  }, [curser]);
  function onCodeChange(str: string) {
    setCurrentPageCode(str);
    setSelectedPage((prev) => {
      pages[curser] = str;
      prev = pages[curser];
      return prev;
    });
  }
  function onAddNewPage() {
    //Add new page with previews page code
    setPages([...pages, pages[pages.length - 1]]);
    //Select the added page
    setCurser(pages.length);
  }
  function onSelectPage(index: number) {
    setCurser(index);
    setSelectedPage(pages[index]);
    setCurrentPageCode(pages[index]);
  }
  function onPlayClicked() {
    setCurser((prev) => (prev = 0));
    setIsPlaying(true);
    setPlayTimer(
      setInterval(() => {
        setCurser((prev) => {
          return prev + 1;
        });
      }, FPS * 10)
    );
  }
  function onStopClicked() {
    setIsPlaying(false);
    clearInterval(playTimer);
  }
  function onRenderClicked() {
    setCurser((prev) => (prev = 0));
    setImages([]);
    setIsRendering(true);
    setRenderTimer(
      setInterval(() => {
        setCurser((prev) => {
          return prev + 1;
        });
      }, 100)
    );
  }

  async function toImage() {
    const c = await html2canvas(
      document.getElementById("viewer") as HTMLDivElement
    );
    const canvasData = c.toDataURL("image/png");
    return canvasData.split(",")[1];
  }
  function download() {
    serviceWorker.call(images);
  }
  function base64ToBinary(base64String: string) {
    const bytes = atob(base64String);
    const binary = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      binary[i] = bytes.charCodeAt(i);
    }
    return new Uint8Array(binary);
  }
  function createBlob(binaryData: any) {
    const blob = new Blob([binaryData], { type: "image/gif" });
    return blob;
  }

  return (
    <AppContainer>
      <Container className="flex w-100 h-80">
        <Container className="w-100 h-100" background="surface2" id="viewer">
          <JSONViewer i={curser} code={JSON.stringify(selectedPage)} />
        </Container>
        <Container className="w-100 h-100" background="secondary">
          <Text variant="primary" fontSize="L">
            Code
          </Text>
          <JSONEditor
            value={JSON.parse(JSON.stringify(currentPageCode))}
            onChange={onCodeChange}
          />
        </Container>
      </Container>
      <Container className="w-100 h-20" background="surface">
        <Timeline
          disablePlayButton={isPlaying || pages.length < 3 || isRendering}
          disableRenderButton={isPlaying || pages.length < 3 || isRendering}
          disableStopButton={!isPlaying || isRendering}
          onRenderClicked={onRenderClicked}
          onPlayClicked={onPlayClicked}
          onStopClicked={onStopClicked}
          pages={pages}
          current={curser}
          onAdd={onAddNewPage}
          onChange={onSelectPage}
        />
      </Container>
    </AppContainer>
  );
}
