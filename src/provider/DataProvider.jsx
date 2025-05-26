import { useState } from "react";
import { DataContext } from "../context";

export default function DataProvider({ children }) {
  /* state manegment start */
  const [route, setRoute] = useState("create");
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  /* state manegment end */
  return (
    <DataContext.Provider
      value={{
        route,
        setRoute,
        setLoading,
        downloadedImages,
        setDownloadedImages,
        loading,
        images,
        setImages,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
