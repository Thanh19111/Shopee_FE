import {useSearchParams} from "react-router-dom";

function UseQueryParam() {
  const [searchParams] = useSearchParams();
  return Object.fromEntries([...searchParams]);
}

export default UseQueryParam;