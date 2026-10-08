import ImageWorkspace from "./ImageWorkspace";

type SideBySideViewProps = {
  referenceImageUrl: string | null;
  drawingImageUrl: string | null;
};

function SideBySideView({
  referenceImageUrl,
  drawingImageUrl,
}: SideBySideViewProps) {
  return (
    <>
      <ImageWorkspace imageType="reference" imageUrl={referenceImageUrl} />
      <ImageWorkspace imageType="drawing" imageUrl={drawingImageUrl} />
    </>
  );
}

export default SideBySideView;
