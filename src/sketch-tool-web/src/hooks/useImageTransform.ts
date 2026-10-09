import { useState, useRef } from "react";

type ImageTransformOptions = {
  imageRef: React.RefObject<HTMLImageElement | null>;
  viewportRef: React.RefObject<HTMLDivElement | null>;
};
function useImageTransform({ imageRef, viewportRef }: ImageTransformOptions) {
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const minimumVisible = 100;
  const zoomDefault = 100;
  const [zoom, setZoom] = useState(zoomDefault);
  const isDragging = useRef(false);
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const panStartX = useRef(0);
  const panStartY = useRef(0);

  // Flip
  function flip() {
    setIsFlipped((previous) => !previous);
  }

  function resetFlip() {
    setIsFlipped(false);
  }
  // Zoom
  function zoomIn() {
    setZoom(Math.min(200, zoom + 10));
  }

  function zoomOut() {
    setZoom(Math.max(75, zoom - 10));
  }
  function resetZoom() {
    setZoom(100);
  }

  // Pan
  function resetPan() {
    setPanX(0);
    setPanY(0);
  }

  // Pointer Handlers

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);

    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;

    panStartX.current = panX;
    panStartY.current = panY;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
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
      viewportRect.width / 2 + imageRect.width / 2 - minimumVisible;
    const maxPanY =
      viewportRect.height / 2 + imageRect.height / 2 - minimumVisible;

    const clampedPanX = Math.max(-maxPanX, Math.min(proposedPanX, maxPanX));
    const clampedPanY = Math.max(-maxPanY, Math.min(proposedPanY, maxPanY));

    setPanX(clampedPanX);
    setPanY(clampedPanY);
  }

  function handlePointerEnded() {
    isDragging.current = false;
  }

  return {
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
  };
}

export default useImageTransform;
