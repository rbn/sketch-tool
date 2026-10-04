import ImageWorkspace from "./ImageWorkspace";

type SideBySideViewProps = {
  referenceImageUrl: string | null;
  referenceImageCallback: () => void;
  drawingImageUrl: string | null;
  drawingImageCallback: () => void;
};

function SideBySideView({
  referenceImageUrl,
  referenceImageCallback,
  drawingImageUrl,
  drawingImageCallback,
}: SideBySideViewProps) {
  return (
    <>
      <ImageWorkspace
        imageType="reference"
        imageUrl={referenceImageUrl}
        onImageSelected={referenceImageCallback}
      />
      <ImageWorkspace
        imageType="drawing"
        imageUrl={drawingImageUrl}
        onImageSelected={drawingImageCallback}
      />
    </>
  );
}

export default SideBySideView;
