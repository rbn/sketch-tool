type OverlayViewProps = {
  referenceImageUrl: string | null;
  drawingImageUrl: string | null;
};

function OverlayView({ referenceImageUrl, drawingImageUrl }: OverlayViewProps) {
  return (
    <>
      {(!referenceImageUrl || !drawingImageUrl) && (
        <span>Both reference and drawing images are required</span>
      )}

      {referenceImageUrl && drawingImageUrl && (
        <div
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
        >
          <img
            src={referenceImageUrl}
            alt="reference image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          <img
            src={drawingImageUrl}
            alt="drawing image"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              opacity: 0.5,
            }}
          />
        </div>
      )}
    </>
  );
}

export default OverlayView;
