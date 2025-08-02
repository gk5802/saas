/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState, useEffect } from "react";

export default function ImageEditor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(100);
  const [blur, setBlur] = useState(0);
  const [fileType, setFileType] = useState<
    "image/png" | "image/jpeg" | "image/webp"
  >("image/png");

  // Handle file selection
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => setImage(img);
    img.src = URL.createObjectURL(file);
  }

  // Draw image with filters
  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    canvasRef.current.width = image.width;
    canvasRef.current.height = image.height;

    ctx.clearRect(0, 0, image.width, image.height);
    ctx.filter = `brightness(${brightness}%) blur(${blur}px)`;
    ctx.drawImage(image, 0, 0, image.width * zoom, image.height * zoom);
  }, [image, zoom, brightness, blur]);

  // Save image
  function saveImage() {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL(fileType);

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `edited.${fileType.split("/")[1]}`;
    a.click();
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <input type="file" onChange={handleFile} accept="image/*" />
      <canvas ref={canvasRef} className="border rounded shadow w-full" />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <label>
          Zoom:
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Brightness:
          <input
            type="range"
            min="10"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(parseInt(e.target.value))}
          />
        </label>
        <label>
          Blur:
          <input
            type="range"
            min="0"
            max="10"
            value={blur}
            onChange={(e) => setBlur(parseInt(e.target.value))}
          />
        </label>
        <label>
          Format:
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value as any)}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WEBP</option>
          </select>
        </label>
      </div>

      <button
        onClick={saveImage}
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Save Image
      </button>
    </div>
  );
}
