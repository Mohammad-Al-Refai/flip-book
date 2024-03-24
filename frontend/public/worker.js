
self.importScripts("./wasm_exec.js")
async function init() {
  const go = new Go();
  self.addEventListener("message", async (event) => {
    if(event.data.command=="start"){
      try {
        WebAssembly.instantiateStreaming(fetch("./main.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
      });
      } catch (error) {
        console.error("Failed to load Wasm module:", error);
      }
    }
    if (event.data.command=="generate") {
      self.postMessage(self.getGif(event.data.frames))
    }
  });
}

init();
