import ReactDOM from "react-dom/client";
import App, { Routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  // </React.StrictMode>
  <RouterProvider router={Routes}>
    <App />
  </RouterProvider>
);
