import { useEffect, useMemo, useState } from "react";
interface WasmPayload {
  error: null | string;
  result: string;
}

export function useGetGif() {
  const [gifBase64, setGifBase64] = useState("");
  const [wasmError, setWasmError] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const worker = useMemo(() => new Worker("worker.js"), []);
  useEffect(() => {
    worker.postMessage({ command: "start" });
  }, []);
  worker.addEventListener("message", (msg: MessageEvent<WasmPayload>) => {
    const { error, result } = msg.data;
    if (error) {
      setIsError(true);
      setWasmError(error);
      setIsLoading(false);
      return;
    }
    setWasmError(null);
    setIsLoading(false);
    setGifBase64(result);
    setIsError(false);
  });
  function call(frames: string[]) {
    worker.postMessage({ command: "generate", frames });
    setIsLoading(true);
  }
  return { call, gifBase64, isLoading, wasmError, isError };
}
