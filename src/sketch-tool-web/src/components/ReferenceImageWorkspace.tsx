import { useEffect, useRef, useState } from "react";

function ReferenceImageWorkspace() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const isDragging = useRef(false);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const panStartX = useRef(0);
  const panStartY = useRef(0);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  function handleImageSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setZoom(100);
    setIsGrayscale(false);
    setIsFlipped(false);
    setPanX(0);
    setPanY(0);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLImageElement>) {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;

    panStartX.current = panX;
    panStartY.current = panY;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLImageElement>) {
    if (!isDragging.current) return;

    setPanX(panStartX.current + (event.clientX - pointerStartX.current));
    setPanY(panStartY.current + (event.clientY - pointerStartY.current));

    console.log("isDragging: " + isDragging.current);
    console.log("pan: " + panStartX.current + " " + panStartY.current);
    console.log("event: " + event.clientX + " " + event.clientY);
  }

  function handlePointerUp(event: React.PointerEvent<HTMLImageElement>) {
    isDragging.current = false;
  }

  return (
    <section>
      <h2>Reference Image</h2>

      <input type="file" accept="image/*" onChange={handleImageSelected} />
      {imageUrl && (
        <div>
          <div>
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
            >
              -
            </button>

            <span>{zoom}%</span>

            <button
              onClick={() => {
                setZoom(100);
                setIsGrayscale(false);
                setIsFlipped(false);
                setPanX(0);
                setPanY(0);
              }}

              disabled={zoom == 100 && !isFlipped && !isGrayscale}
            >
              Reset
            </button>

            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              disabled={zoom >= 200}
            >
              +
            </button>
            <button onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
            <button onClick={() => setIsGrayscale(!isGrayscale)}>
              Grayscale
            </button>
          </div>
          <div
            style={{
              width: 600,
              height: 500,
              overflow: `hidden`,
              border: `1px solid #ccc`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={imageUrl}
              alt="Reference"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                transform: `translate(${panX}px, ${panY}px) scale(${(zoom / 100) * (isFlipped ? -1 : 1)}, ${zoom / 100})`,
                filter: `grayscale(${isGrayscale ? 1 : 0})`,
              }}
              draggable={false}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default ReferenceImageWorkspace;
