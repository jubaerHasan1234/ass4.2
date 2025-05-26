import { useState } from "react";
import { ToastContainer } from "react-toastify";
import CreatePage from "./Components/Content/CreatePage";
import DownloadPage from "./Components/Content/DownladPage";
import Glow from "./Components/Glow/Glow";
import Header from "./Components/Header/Header";
export default function App() {
  /* state manegment start */
  const [route, setRoute] = useState("create");
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  /* state manegment end */

  const addToDownloads = (image) => {
    setDownloadedImages((prev) => {
      const exists = prev.find((img) => img.id === image.id);
      console.log(exists);

      if (exists) return prev;
      return [...prev, image];
    });
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header currentRoute={route} onRouteChange={setRoute} />
      <Glow />
      {route === "create" && (
        <CreatePage
          onImageDownload={addToDownloads}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {route === "download" && (
        <DownloadPage
          downloadedImages={downloadedImages}
          onImageDownload={addToDownloads}
          loading={loading}
        />
      )}
      <ToastContainer />
    </div>
  );
}
