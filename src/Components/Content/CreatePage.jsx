import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import HTwo from "../Common/HTwo";
import Spinner from "../Common/Spinner";
import ImageGrid from "./ImageGrid";
import Search from "./Search";
import Setting from "./Setting";
export default function CreatePage({ onImageDownload, loading, setLoading }) {
  /* state manegment start */
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);

  const [models, setModels] = useState([]);
  const [settings, setSettings] = useState({
    model: "flux",
    width: 1000,
    height: 1000,
  });
  const [settingLoad, setSettingLoad] = useState(true);
  /* state manegment end */

  /* models fetch start */
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setSettingLoad(true);
        const response = await fetch("https://image.pollinations.ai/models");
        console.log(response);
        const modelList = await response.json();
        if (response.ok) {
          setSettingLoad(false);
          setModels(modelList);
        }

        if (modelList.length > 0) {
          setSettings((prev) => ({ ...prev, model: modelList[0] }));
        }
      } catch (error) {
        setSettingLoad(false);
        console.error("Failed to fetch models:", error);
        setModels(["flux", "turbo"]);
      }
    };

    fetchModels();
  }, []);
  /* models fetch end*/
  /* generate image start */
  const generateImages = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setImages([]);

    try {
      const imagePromises = Array.from({ length: 9 }, async (_, index) => {
        const randomSeed = Math.floor(Math.random() * 1000000);
        const seed = settings.seed || randomSeed;

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
          prompt
        )}?model=${settings.model}&width=${settings.width}&height=${
          settings.height
        }&seed=${seed + index}&nologo=true`;

        return new Promise((resolve, reject) => {
          const img = new Image();
          const timeoutId = setTimeout(() => {
            reject(new Error("Image load timeout"));
          }, 10000);

          img.onload = () => {
            clearTimeout(timeoutId);
            resolve({
              url: imageUrl,
              prompt,
              seed: seed + index,
              id: `${prompt}-${seed + index}`,
            });
          };

          img.onerror = () => {
            clearTimeout(timeoutId);
            reject(new Error("Failed to load image"));
          };

          img.src = imageUrl;
        });
      });

      const results = await Promise.allSettled(imagePromises);
      console.log(results);

      const successfulImages = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      setImages(results);

      if (successfulImages.length === 0) {
        toast.error("Failed to generate any images. Please try again.");
      } else if (successfulImages.length < 9) {
        toast.warn(
          `Generated ${successfulImages.length} out of 9 images. Some failed to load.`
        );
      } else {
        toast.success("Successfully generated all images!");
      }
    } catch (error) {
      console.error("Error generating images:", error);
      toast.error("Failed to generate images. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  /* generate image end */
  /* handel function start */
  const handleSubmit = (e) => {
    e.preventDefault();
    generateImages();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      generateImages();
    }
  };
  /* handel function start */
  return (
    <main className="relative z-10">
      <HTwo h2Style="text-4xl font-bold mb-8">
        Let's create a masterpiece, Alvian! <span className="text-2xl">👋</span>
      </HTwo>
      <Search
        onHandleKeyPress={handleKeyPress}
        onHandleSubmit={handleSubmit}
        onSetPrompt={setPrompt}
        prompt={prompt}
        loading={loading}
      />
      {settingLoad ? (
        <Spinner hightAndWidth={"h-16 w-16 "} />
      ) : (
        <Setting
          settings={settings}
          onSettingsChange={setSettings}
          models={models}
          disabled={loading}
        />
      )}
      <ImageGrid
        images={images}
        loading={loading}
        onImageDownload={onImageDownload}
      />
    </main>
  );
}
