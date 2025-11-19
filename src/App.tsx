import './App.css'
import useRouteElement from "./hooks/useRouteElement.tsx";
import {ToastContainer} from "react-toastify";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useContext, useEffect} from "react";
import {LocalStorageEventTarget} from "./utils/auth.ts";
import {AppContext} from "./contexts/app.context.tsx";

function App() {
  const {reset} = useContext(AppContext);
  const routeElement = useRouteElement();
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  
  return <div>
    {routeElement}
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false}/>
  </div>
}

export default App
