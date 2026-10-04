import { useState } from "react";
import SideBySideView from "./SideBySideView";
import OverlayView from "./OverlayView";

function ComparisonWorkspace() {
  const [referenceImageUrl, setReferenceImageUrl] = useState<string | null>(
    null,
  );
  const [drawingImageUrl, setDrawingImageUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"side-by-side" | "overlay">("side-by-side");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (
      event.target.value === "side-by-side" ||
      event.target.value === "overlay"
    ) {
      setMode(event.target.value);
    }
  }

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
          onReferenceImageSelected={setReferenceImageUrl}
          drawingImageUrl={drawingImageUrl}
          onDrawingImageSelected={setDrawingImageUrl}
        />
      )}
      {mode === "overlay" && (
        <OverlayView
          referenceImageUrl={referenceImageUrl}
          onReferenceImageSelected={setReferenceImageUrl}
          drawingImageUrl={drawingImageUrl}
          onDrawingImageSelected={setDrawingImageUrl}
        />
      )}
    </div>
  );
}

export default ComparisonWorkspace;
