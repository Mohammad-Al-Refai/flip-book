/** @format */

import { useEffect, useMemo, useState } from "react";

export function useGetGif() {
  const [gifBase64, setGifBase64] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const worker = useMemo(() => new Worker("worker.js"), []);
  useEffect(() => {
    worker.postMessage({ command: "start" });
  }, []);
  worker.addEventListener("message", (msg) => {
    setGifBase64(msg.data);
    setIsLoading(false);
  });
  function call(frames: string[]) {
    console.log("HELLOW");
    worker.postMessage({ command: "generate", frames });
    setIsLoading(true);
  }
  return { call, gifBase64, isLoading };
}
