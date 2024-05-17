import { useEffect, useState } from "react";

export function usePlayController({
  delayPerFrame,
  limit,
  onTick,
}: usePlayControllerProps) {
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    if (counter === limit) {
      console.log({
        counter,
        limit,
      });
      setCounter(0);
    } else if (isPlaying) {
      onTick(counter);
    }
  }, [counter, limit, onTick]);
  function play() {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, delayPerFrame);
    setIntervalId(interval);
  }
  function stop() {
    clearInterval(intervalId);
    setIsPlaying(false);
  }
  function pause() {
    clearInterval(intervalId);
    setIsPlaying(false);
  }
  return {
    play,
    stop,
    pause,
    isPlaying,
  };
}

interface usePlayControllerProps {
  limit: number;
  delayPerFrame: number;
  onTick: (frameIndex: number) => void;
}
