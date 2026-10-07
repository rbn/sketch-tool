import { useRef, useState } from "react";
import useImageTransform from "../hooks/useImageTransform";

type ImageWorkspaceProps = {
  imageType: "reference" | "drawing";
  imageUrl: string | null;
  onImageSelected: (file: File) => void;
};

function ImageWorkspace({
  imageType,
  imageUrl,
  onImageSelected,
}: ImageWorkspaceProps) {
  const [isGrayscale, setIsGrayscale] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isGridEnabled, setIsGridEnabled] = useState(false);
  const imageLabel = imageType === "reference" ? "Reference" : "Drawing";
  const {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    panX,
    panY,
    resetPan,
    isFlipped,
    flip,
    resetFlip,
    handlePointerDown,
    handlePointerMove,
    handlePointerEnded,
  } = useImageTransform({ imageRef, viewportRef });

  function handleImageSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    onImageSelected(file);
    resetZoom();
    setIsGrayscale(false);
    resetFlip();
    resetPan();
    setIsGridEnabled(false);
  }

  return (
    <section>
      <h2>{imageLabel} Image</h2>

      <input type="file" accept="image/*" onChange={handleImageSelected} />
      {imageUrl && (
        <div>
          <div>
            <button onClick={zoomOut} disabled={zoom <= 75}>
              -
            </button>

            <span>{zoom}%</span>

            <button
              onClick={() => {
                resetZoom();
                setIsGrayscale(false);
                resetFlip();
                resetPan();
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

            <button onClick={zoomIn} disabled={zoom >= 200}>
              +
            </button>
            <button onClick={flip}>Flip</button>
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
              <img
                src={imageUrl}
                alt={`${imageLabel} image`}
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

export default ImageWorkspace;
