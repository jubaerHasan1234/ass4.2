import { toast } from "react-toastify";
import Button from "../Common/Button";
import DownloadSvg from "../Common/DownloadSvg";
import ImageLoading from "../Common/ImageLoading";
import Loading from "../Common/Loading";

const ImageGrid = ({ images, loading, onImageDownload }) => {
  /* download function start */
  const downloadImage = async (image) => {
    try {
      const response = await fetch(image.value.url);

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      link.download = `ai-image-${image.value.seed}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      onImageDownload(image);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Failed to download image");
    }
  };
  /* download function end */

  if (loading === false && images.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400 text-2xl">
        <p>No images generated yet. Enter a prompt and click generate!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {loading ? (
        <ImageLoading />
      ) : (
        images.map((image) =>
          image.status === "fulfilled" ? (
            <div
              key={image.value.id}
              className="image-card rounded-xl overflow-hidden cursor-pointer relative group"
            >
              <Button
                onClick={() => downloadImage(image)}
                buttonStyle="absolute bottom-2 right-2 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-all z-10 disabled:opacity-50  cursor-pointer"
              >
                <DownloadSvg />
              </Button>
              <img
                src={image.value.url}
                alt={`Generated: ${image.value.prompt}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBzdHJva2U9IiM3MTcxNzEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
                  target.alt = "Unable to load image";
                }}
              />
            </div>
          ) : (
            <Loading key={crypto.randomUUID()}>
              <p className="text-pink-500 text-2xl">Unable to Load!</p>
            </Loading>
          )
        )
      )}
    </div>
  );
};

export default ImageGrid;
