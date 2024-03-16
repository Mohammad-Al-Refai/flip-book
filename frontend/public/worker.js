
self.importScripts("./wasm_exec.js")
async function init() {
  const go = new Go();
  self.addEventListener("message", async (event) => {
    if(event.data.command=="start"){
      try {
        WebAssembly.instantiateStreaming(fetch("./public/main.wasm"), go.importObject).then((result) => {
        go.run(result.instance);
      });
      } catch (error) {
        console.error("Failed to load Wasm module:", error);
      }
    }
    if (event.data.command=="generate") {
      console.log("START GENERATING")
  console.log({data:event.data})
      self.postMessage(self.getGif(event.data.frames))
    }
  });
}

init();
