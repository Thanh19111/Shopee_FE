import './App.css'
import useRouteElement from "./hooks/useRouteElement.tsx";
import {ToastContainer} from "react-toastify";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {
  const routeElement = useRouteElement();

  return <div>
    {routeElement}
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false}/>
  </div>
}

export default App
