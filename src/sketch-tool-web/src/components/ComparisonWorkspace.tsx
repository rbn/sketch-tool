import { useState, useEffect, useRef } from "react";
import SideBySideView from "./SideBySideView";
import OverlayView from "./OverlayView";

function ComparisonWorkspace() {
  const [referenceImageUrl, setReferenceImageUrl] = useState<string | null>(
    null,
  );
  const [drawingImageUrl, setDrawingImageUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"side-by-side" | "overlay">("side-by-side");
  const referenceUrlRef = useRef<string | null>(null);
  const drawingUrlRef = useRef<string | null>(null);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.value === "side-by-side" ||
      event.target.value === "overlay"
    ) {
      setMode(event.target.value);
    }
  }

  function handeCreateReferenceImageSelected(file: File) {
    if (referenceUrlRef.current) URL.revokeObjectURL(referenceUrlRef.current);

    const newUrl = URL.createObjectURL(file);
    setReferenceImageUrl(newUrl);
    referenceUrlRef.current = newUrl;
  }

  function handleDrawingImageSelected(file: File) {
    if (drawingUrlRef.current) URL.revokeObjectURL(drawingUrlRef.current);

    const newUrl = URL.createObjectURL(file);
    setDrawingImageUrl(newUrl);
    drawingUrlRef.current = newUrl;
  }

  useEffect(() => {
    return () => {
      [referenceUrlRef.current, drawingUrlRef.current].forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div>
      <form>
        <label>
          <input
            type="radio"
            name="modeSelector"
            value="side-by-side"
            checked={mode === "side-by-side"}
            onChange={handleChange}
          />
          Side by side
        </label>
        <label>
          <input
            type="radio"
            name="modeSelector"
            value="overlay"
            checked={mode === "overlay"}
            onChange={handleChange}
          />
          Overlay
        </label>
      </form>
      {mode === "side-by-side" && (
        <SideBySideView
          referenceImageUrl={referenceImageUrl}
          onReferenceImageSelected={handeCreateReferenceImageSelected}
          drawingImageUrl={drawingImageUrl}
          onDrawingImageSelected={handleDrawingImageSelected}
        />
      )}
      {mode === "overlay" && (
        <OverlayView
          referenceImageUrl={referenceImageUrl}
          drawingImageUrl={drawingImageUrl}
        />
      )}
    </div>
  );
}

export default ComparisonWorkspace;
