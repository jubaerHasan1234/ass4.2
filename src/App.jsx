import { ToastContainer } from "react-toastify";
import CreatePage from "./Components/Content/CreatePage";
import DownloadPage from "./Components/Content/DownladPage";
import Glow from "./Components/Glow/Glow";
import Header from "./Components/Header/Header";
import { useDataContext } from "./hook";
export default function App() {
  const { route } = useDataContext();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />
      <Glow />
      {route === "create" && <CreatePage />}
      {route === "download" && <DownloadPage />}
      <ToastContainer />
    </div>
  );
}
