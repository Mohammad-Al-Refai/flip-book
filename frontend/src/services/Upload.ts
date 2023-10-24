export async function Upload(data: string[]) {
  const req = await fetch(
    "https://json-illustrator-backend.onrender.com/upload",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        images: data,
      }),
    }
  );
  const res = req.blob;
  return res;
}
