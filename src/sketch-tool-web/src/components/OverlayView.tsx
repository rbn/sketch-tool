import { useRef, useState } from "react";
import useImageTransform from "../hooks/useImageTransform";

type OverlayViewProps = {
  referenceImageUrl: string | null;
  drawingImageUrl: string | null;
};

function OverlayView({ referenceImageUrl, drawingImageUrl }: OverlayViewProps) {
  const [activeLayer, setActiveLayer] = useState<"reference" | "drawing">(
    "reference",
  );
  const referenceImageRef = useRef<HTMLImageElement>(null);
  const drawingImageRef = useRef<HTMLImageElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const referenceTransform = useImageTransform({
    imageRef: referenceImageRef,
    viewportRef,
  });
  const drawingTransform = useImageTransform({
    imageRef: drawingImageRef,
    viewportRef,
  });
  const activeTransform =
    activeLayer === "reference" ? referenceTransform : drawingTransform;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.value === "reference" ||
      event.target.value === "drawing"
    ) {
      setActiveLayer(event.target.value);
    }
  }

  return (
    <>
      {(!referenceImageUrl || !drawingImageUrl) && (
        <span>Both reference and drawing images are required</span>
      )}

      {referenceImageUrl && drawingImageUrl && (
        <>
          <form>
            <label>
              <input
                type="radio"
                name="layerSelector"
                value="reference"
                checked={activeLayer === "reference"}
                onChange={handleChange}
              />
              Reference
            </label>
            <label>
              <input
                type="radio"
                name="layerSelector"
                value="drawing"
                checked={activeLayer === "drawing"}
                onChange={handleChange}
              />
              Drawing
            </label>
          </form>
          <div>
            <button
              onClick={activeTransform.zoomOut}
              disabled={activeTransform.zoom <= 75}
            >
              -
            </button>

            <span>{activeTransform.zoom}%</span>

            <button
              onClick={() => {
                activeTransform.resetZoom();
                activeTransform.resetFlip();
                activeTransform.resetPan();
              }}

              disabled={
                activeTransform.zoom === 100 &&
                !activeTransform.isFlipped &&
                activeTransform.panX === 0 &&
                activeTransform.panY === 0
              }
            >
              Reset
            </button>

            <button
              onClick={activeTransform.zoomIn}
              disabled={activeTransform.zoom >= 200}
            >
              +
            </button>
            <button onClick={activeTransform.flip}>Flip</button>
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
              position: "relative",
            }}
            onPointerDown={activeTransform.handlePointerDown}
            onPointerMove={activeTransform.handlePointerMove}
            onPointerUp={activeTransform.handlePointerEnded}
          >
            <img
              src={referenceImageUrl}
              alt="reference image"
              ref={referenceImageRef}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${referenceTransform.panX}px, ${referenceTransform.panY}px) scale(${(referenceTransform.zoom / 100) * (referenceTransform.isFlipped ? -1 : 1)}, ${referenceTransform.zoom / 100})`,
              }}
            />
            <img
              src={drawingImageUrl}
              alt="drawing image"
              ref={drawingImageRef}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate(${drawingTransform.panX}px, ${drawingTransform.panY}px) scale(${(drawingTransform.zoom / 100) * (drawingTransform.isFlipped ? -1 : 1)}, ${drawingTransform.zoom / 100})`,
                opacity: 0.5,
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default OverlayView;
