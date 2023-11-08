import "@fontsource/inter";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import useScript from "./useScript";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RouterOrders from "./routers/Orders";
import RouterGroups from "./routers/Groups";

import LoginPage from "./pages/LoginPage";

import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const queryClient = new QueryClient();
  const status = useScript(`https://unpkg.com/feather-icons`);

  useEnhancedEffect(() => {
    // Feather icon setup: https://github.com/feathericons/feather#4-replace
    // @ts-ignore
    if (typeof feather !== "undefined") {
      // @ts-ignore
      feather.replace();
    }
  }, [status]);

  function Dashboard() {
    return (
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          <Header />
          <Sidebar />
          <Router>
            <Routes>
              <Route path="/orders" element={<RouterOrders />} />
              <Route path="/groups" element={<RouterGroups />} />
            </Routes>
          </Router>
        </Box>
      </CssVarsProvider>
    );
  }

  return (
    <Provider store={store}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        {localStorage.getItem("Access-Token") === null ? (
          <LoginPage />
        ) : (
          <Dashboard />
        )}
      </QueryClientProvider>
    </Provider>
  );
}
