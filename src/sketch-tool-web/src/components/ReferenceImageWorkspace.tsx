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
  const imageRef = useRef<HTMLImageElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const minimumVisible = 100;
  const [isGridEnabled, setIsGridEnabled] = useState(false);

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
    // console.log(imageRef.current?.getBoundingClientRect());
    // console.log(viewportRef.current?.getBoundingClientRect());

    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;

    panStartX.current = panX;
    panStartY.current = panY;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLImageElement>) {
    if (!isDragging.current) return;

    const proposedPanX =
      panStartX.current + (event.clientX - pointerStartX.current);
    const proposedPanY =
      panStartY.current + (event.clientY - pointerStartY.current);

    const imageRect = imageRef.current?.getBoundingClientRect();
    const viewportRect = viewportRef.current?.getBoundingClientRect();

    if (!imageRect || !viewportRect) {
      return;
    }

    const maxPanX =
      viewportRect?.width / 2 + imageRect?.width / 2 - minimumVisible;
    const maxPanY =
      viewportRect?.height / 2 + imageRect?.height / 2 - minimumVisible;

    const clampedPanX = Math.max(-maxPanX, Math.min(proposedPanX, maxPanX));
    const clampedPanY = Math.max(-maxPanY, Math.min(proposedPanY, maxPanY));

    setPanX(clampedPanX);
    setPanY(clampedPanY);

    console.log(
      proposedPanX +
        "," +
        proposedPanY +
        "," +
        imageRect?.width +
        "," +
        imageRect?.height +
        "," +
        maxPanX +
        "," +
        maxPanY,
    );

    // console.log("isDragging: " + isDragging.current);
    // console.log("pan: " + panStartX.current + " " + panStartY.current);
    // console.log("event: " + event.clientX + " " + event.clientY);
  }

  function handlePointerEnded(event: React.PointerEvent<HTMLImageElement>) {
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
              onClick={() => setZoom(Math.max(75, zoom - 10))}
              disabled={zoom <= 75}
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
                setIsGridEnabled(false);
              }}

              disabled={
                zoom === 100 &&
                !isFlipped &&
                !isGrayscale &&
                panX === 0 &&
                panY === 0 &&
                isGridEnabled === false
              }
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
            <button onClick={() => setIsGridEnabled(!isGridEnabled)}>
              Show Grid
            </button>
          </div>
          <div
            ref={viewportRef}
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
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                transform: `translate(${panX}px, ${panY}px) scale(${(zoom / 100) * (isFlipped ? -1 : 1)}, ${zoom / 100})`,
              }}
            >
              {" "}
              <img
                src={imageUrl}
                alt="Reference"
                ref={imageRef}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  filter: `grayscale(${isGrayscale ? 1 : 0})`,
                }}
                draggable={false}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnded}
                onPointerCancel={handlePointerEnded}
              />
              {isGridEnabled && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    backgroundImage: `
  repeating-linear-gradient(
    to right,
    rgba(0, 0, 255, 0.5) 0,
    rgba(0, 0, 255, 0.5) 1px,
    transparent 1px,
    transparent 50px
  ),
  repeating-linear-gradient(
    to bottom,
    rgba(0, 0, 255, 0.5) 0,
    rgba(0, 0, 255, 0.5) 1px,
    transparent 1px,
    transparent 50px
  )
`,
                  }}
                ></div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReferenceImageWorkspace;
