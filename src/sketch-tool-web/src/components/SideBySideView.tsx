import ImageWorkspace from "./ImageWorkspace";

type SideBySideViewProps = {
  referenceImageUrl: string | null;
  onReferenceImageSelected: (imageUrl: string) => void;
  drawingImageUrl: string | null;
  onDrawingImageSelected: (imageUrl: string) => void;
};

function SideBySideView({
  referenceImageUrl,
  onReferenceImageSelected,
  drawingImageUrl,
  onDrawingImageSelected,
}: SideBySideViewProps) {
  return (
    <>
      <ImageWorkspace
        imageType="reference"
        imageUrl={referenceImageUrl}
        onImageSelected={onReferenceImageSelected}
      />
      <ImageWorkspace
        imageType="drawing"
        imageUrl={drawingImageUrl}
        onImageSelected={onDrawingImageSelected}
      />
    </>
  );
}

export default SideBySideView;
