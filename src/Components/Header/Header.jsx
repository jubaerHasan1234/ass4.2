import { useDataContext } from "../../hook";
import logo from "../../images/logo.svg";
import ATag from "../Common/ATag";
export default function Header() {
  const { route, setRoute } = useDataContext();
  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img src={logo} className="h-10" />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        <ATag
          className={`hover:text-zinc-200 cursor-pointer transition-all ${
            route === "create" ? "font-medium text-zinc-200" : ""
          }`}
          onClick={(listen) => {
            setRoute("create");
            listen.preventDefault();
          }}
        >
          Create Image
        </ATag>
        <ATag
          className={`hover:text-zinc-200 cursor-pointer transition-all ${
            route === "download" ? "font-medium text-zinc-200" : ""
          }`}
          onClick={(listen) => {
            setRoute("download");
            listen.preventDefault();
          }}
        >
          Downloaded
        </ATag>
      </ul>
    </header>
  );
}
