import ReactDOM from "react-dom/client";
import App, { Routes } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  // </React.StrictMode>
  <Provider store={store}>
  <RouterProvider router={Routes}>
    <App />
  </RouterProvider>
</Provider>

);
