import { useEffect, useState } from "react";

function ReferenceImageWorkspace() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

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
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              disabled={zoom >= 200}
            >
              +
            </button>
          </div>

          <img src={imageUrl} alt="Reference" style={{ width: `${zoom}%` }} />
        </div>
      )}
    </section>
  );
}

export default ReferenceImageWorkspace;
