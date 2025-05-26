import Loading from "./Loading";
import Spinner from "./Spinner";

export default function ImageLoading() {
  return Array.from({ length: 9 }).map((_, index) => (
    <Loading key={index}>
      <Spinner hightAndWidth={"h-10 w-11"} />
    </Loading>
  ));
}
