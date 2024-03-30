export function toPNGBase64(data: string) {
  return "data:image/png;base64," + data;
}
export function base64ToBinary(base64String: string) {
  const bytes = atob(base64String);
  const binary = new Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    binary[i] = bytes.charCodeAt(i);
  }
  return new Uint8Array(binary);
}

export function createBlob(binaryData: any) {
  const blob = new Blob([binaryData], { type: "image/gif" });
  return blob;
}
