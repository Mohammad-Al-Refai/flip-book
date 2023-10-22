export async function Upload(data: string[], fps: number) {
  const req = await fetch("http://localhost:4000/upload", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      images: data,
      fps,
    }),
  });
  const res = req.blob;
  return res;
}
