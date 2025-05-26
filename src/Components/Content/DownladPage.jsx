import { useDataContext } from "../../hook";
import ImageGrid from "./ImageGrid";

export default function DownloadPage() {
  const { downloadedImages } = useDataContext();
  return (
    <main className="relative z-10">
      <h2 className="text-4xl font-bold mb-8">
        Downloaded <span className="text-2xl">👋</span>
      </h2>
      <ImageGrid images={downloadedImages} />
    </main>
  );
}
