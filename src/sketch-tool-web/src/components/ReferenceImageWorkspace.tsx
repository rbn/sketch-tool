import { useEffect, useState } from "react";

function ReferenceImageWorkspace() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  function handleImageSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setZoom(100);
    setIsGrayscale(false);
    setIsFlipped(false);
  }

  return (
    <section>
      <h2>Reference Image</h2>

      <input type="file" accept="image/*" onChange={handleImageSelected} />
      {imageUrl && (
        <div>
          <div>
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
            >
              -
            </button>

            <span>{zoom}%</span>

            <button
              onClick={() => {
                setZoom(100);
                setIsGrayscale(false);
                setIsFlipped(false);
              }}

              disabled={zoom == 100 && !isFlipped && !isGrayscale}
            >
              Reset
            </button>

            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              disabled={zoom >= 200}
            >
              +
            </button>
            <button onClick={() => setIsFlipped(!isFlipped)}>Flip</button>
            <button onClick={() => setIsGrayscale(!isGrayscale)}>
              Grayscale
            </button>
          </div>

          <img
            src={imageUrl}
            alt="Reference"
            style={{
              width: `${zoom}%`,
              transform: `scaleX(${isFlipped ? -1 : 1})`,
              filter: `grayscale(${isGrayscale ? 1 : 0})`,
            }}
          />
        </div>
      )}
    </section>
  );
}

export default ReferenceImageWorkspace;
