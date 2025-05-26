import Button from "../Common/Button";
import Input from "../Common/Input";
import Spinner from "../Common/Spinner";
import InputBox from "./InputBox";

export default function Setting({
  settings,
  onSettingsChange,
  models,
  disabled,
  settingLoad,
  onHandleKeyPress,
}) {
  /* initial state start */
  const aspectRatios = [
    { label: "1:1", width: 1000, height: 1000 },
    { label: "16:9", width: 1920, height: 1080 },
    { label: "4:3", width: 640, height: 480 },
    { label: "3:2", width: 1280, height: 720 },
  ];
  /* initial state start */
  /* handel function start */
  const handleRatioClick = (width, height) => {
    onSettingsChange({ ...settings, width, height });
  };
  /* handel function end */

  return (
    <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
      {settingLoad ? (
        <Spinner hightAndWidth={"h-14 w-14 "} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Advanced Settings</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputBox
              lable={"Model"}
              lableStyle={"block text-sm font-medium text-zinc-700 mb-1"}
              htmlFor={"model"}
            >
              <select
                id="model"
                value={settings.model}
                onChange={(e) =>
                  onSettingsChange({ ...settings, model: e.target.value })
                }
                disabled={disabled}
                className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
              >
                {models.map((model) => (
                  <option key={model} value={model} className="bg-zinc-900">
                    {model}
                  </option>
                ))}
              </select>
            </InputBox>

            <InputBox
              htmlFor={"seed"}
              lableStyle={"block text-sm font-medium text-zinc-700 mb-1"}
              lable={"Seed (for reproducible results)"}
            >
              <Input
                type="number"
                id="seed"
                onKeyPress={onHandleKeyPress}
                value={settings.seed || ""}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    seed: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                disabled={disabled}
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                placeholder="Random"
              />
            </InputBox>

            <InputBox
              lable={"Width"}
              htmlFor={"width"}
              lableStyle={"block text-sm font-medium text-zinc-700 mb-1"}
            >
              <Input
                type="number"
                id="width"
                onKeyPress={onHandleKeyPress}
                value={settings.width}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    width: parseInt(e.target.value) || 1000,
                  })
                }
                disabled={disabled}
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
              />
            </InputBox>

            <InputBox
              lable={"Height"}
              htmlFor={"height"}
              lableStyle={"block text-sm font-medium text-zinc-700 mb-1"}
            >
              <Input
                type="number"
                id="height"
                onKeyPress={onHandleKeyPress}
                value={settings.height}
                onChange={(e) =>
                  onSettingsChange({
                    ...settings,
                    height: parseInt(e.target.value) || 1000,
                  })
                }
                disabled={disabled}
                className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
              />
            </InputBox>

            <InputBox
              lable={"Aspect Ratio Presets"}
              lableStyle={"block text-sm font-medium text-zinc-700 mb-1"}
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {aspectRatios.map((ratio) => (
                  <Button
                    key={ratio.label}
                    type="button"
                    onClick={() => handleRatioClick(ratio.width, ratio.height)}
                    disabled={disabled}
                    buttonStyle={`bg-zinc-900/10 px-3 py-3 text-xs hover:bg-zinc-800 rounded transition-colors disabled:opacity-50 cursor-pointer ${
                      settings.height === ratio.height &&
                      settings.width === ratio.width
                        ? `ring-zinc-800 ring-3 outline-none`
                        : ""
                    } `}
                  >
                    {ratio.label}
                  </Button>
                ))}
              </div>
            </InputBox>
          </div>{" "}
        </>
      )}
    </div>
  );
}
