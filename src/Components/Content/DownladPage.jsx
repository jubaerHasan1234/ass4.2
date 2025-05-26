import { useDataContext } from "../../hook";
import ImageGrid from "./ImageGrid";

export default function DownloadPage({ onImageDownload }) {
  const { downloadedImages, loading } = useDataContext();
  return (
    <main className="relative z-10">
      <h2 className="text-4xl font-bold mb-8">
        Downloaded <span class="text-2xl">👋</span>
      </h2>
      <ImageGrid
        images={downloadedImages}
        loading={loading}
        onImageDownload={onImageDownload}
      />
    </main>
  );
}
