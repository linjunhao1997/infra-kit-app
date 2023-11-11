import "@fontsource/inter";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import useScript from "./useScript";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import orders from "./routers/iam/Orders";
import groups from "./routers/iam/Groups";

import LoginPage from "./pages/LoginPage";

import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RouterPaths } from "./routers/path";
import Orgs from "./routers/iam/Orgs";
import Users from "./routers/iam/Users";
import Authorities from "./routers/iam/Authorities";
import Namespaces from "./routers/iam/Namespaces";
import Orders from "./routers/iam/Orders";
import Groups from "./routers/iam/Groups";

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
          <Router>
            <Sidebar />
            <Routes>
              <Route path={RouterPaths.orgs} element={<Orgs />} />
              <Route path={RouterPaths.users} element={<Users />} />
              <Route path={RouterPaths.authorities} element={<Authorities />} />
              <Route path={RouterPaths.namespaces} element={<Namespaces />} />
              <Route path={RouterPaths.orders} element={<Orders />} />
              <Route path={RouterPaths.groups} element={<Groups />} />
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
