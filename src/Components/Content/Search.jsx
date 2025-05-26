import Button from "../Common/Button";
import Input from "../Common/Input";
import SearchSvg from "../Common/SearchSvg";
import Send from "../Common/Send";

export default function Search({
  onHandleSubmit,
  onSetPrompt,
  onHandleKeyPress,
  prompt,
  loading,
}) {
  return (
    <form
      className="relative mb-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm"
      onSubmit={onHandleSubmit}
    >
      <div className="flex items-center">
        <div className="pl-5 pr-2">
          <SearchSvg />
        </div>
        <Input
          type="text"
          placeholder="Create with Prompts"
          className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg"
          value={prompt}
          onChange={(e) => onSetPrompt(e.target.value)}
          onKeyPress={onHandleKeyPress}
          disabled={loading}
        />
        <Button buttonStyle="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full">
          <Send />
        </Button>
      </div>
    </form>
  );
}
