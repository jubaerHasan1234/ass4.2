import { ToastContainer } from "react-toastify";
import CreatePage from "./Components/Content/CreatePage";
import DownloadPage from "./Components/Content/DownladPage";
import Glow from "./Components/Glow/Glow";
import Header from "./Components/Header/Header";
import { useDataContext } from "./hook";
export default function App() {
  const { setDownloadedImages, route, setRoute } = useDataContext();
  const addToDownloads = (image) => {
    setDownloadedImages((prev) => {
      const exists = prev.find((img) => img.value.id === image.value.id);
      console.log(exists);

      if (exists) return prev;
      return [...prev, image];
    });
  };
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header currentRoute={route} onRouteChange={setRoute} />
      <Glow />
      {route === "create" && <CreatePage onImageDownload={addToDownloads} />}
      {route === "download" && (
        <DownloadPage onImageDownload={addToDownloads} />
      )}
      <ToastContainer />
    </div>
  );
}
