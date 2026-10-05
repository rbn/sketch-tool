import { useState } from "react";

function useImageTransform() {
  const [zoom, setZoom] = useState(100);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  return {
    zoom,
    setZoom,
    panX,
    panY,
    isFlipped,
  };
}

export default useImageTransform;
