import ImageGrid from "./ImageGrid";

export default function DownloadPage({
  downloadedImages,
  loading,
  onImageDownload,
}) {
  return (
    <main class="relative z-10">
      <h2 class="text-4xl font-bold mb-8">
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
