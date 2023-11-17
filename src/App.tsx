import "@fontsource/inter";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import useScript from "./useScript";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import LoginPage from "./pages/LoginPage";

import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouteObject, Link, useRoutes, Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Orgs from "./routers/iam/Orgs";
import Users from "./routers/iam/Users";
import Authorities from "./routers/iam/Authorities";
import Namespaces from "./routers/iam/Namespaces";
import toast, { Toaster } from "react-hot-toast";
import Alert from "@mui/joy/Alert";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import GroupEditor from "@/components/GroupEditor";
import GroupTable from "@/components/GroupTable";
import Groups from "./routers/iam/Groups";
import OrgTable from "./components/OrgTable";
import AuthorityTable from "./components/AuthorityTable";
import NamespaceTable from "./components/NamespaceTable";
import UserTable from "./components/UserTable";
import { RouterPaths } from "./routers/path";
import CrumbLink from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export const paths = {
  groups: "/iam/groups",
  users: "/iam/users",
  authorities: "/iam/authorities",
  orgs: "/iam/orgs",
  namespaces: "/iam/namespaces",
  orders: "/iam/orders",
};

export const Routes = createBrowserRouter( [
  {
    path: "/",
    element: <JoyOrderDashboardTemplate/>,
    handle: {
      crumb: () => (
        <CrumbLink
          underline="hover"
          color="neutral"
          href="/"
          aria-label="Home"
        >
          <HomeRoundedIcon />
        </CrumbLink>
      ),
    },
    children: [
      { index: true, element: <Home /> },
      {
        path: RouterPaths.groups,
        element: <Groups />,
        handle: {
          crumb: () => (
            <CrumbLink
              underline="none"
              color="neutral"
              href="/iam/groups"
              aria-label="groups"
            >
              身份与访问
            </CrumbLink>
          ),
        },
        children: [
          {
            index: true,
            handle: {
              crumb: () => (
                <CrumbLink
                  underline="hover"
                  color="neutral"
                  href="/iam/groups"
                  aria-label="groups"
                >
                  用户组
                </CrumbLink>
              ),
            },
            element: <GroupTable />,
          },
          {
            path: ":id",
            handle: {
              crumb: () => (
                <CrumbLink
                  underline="none"
                  color="neutral"
                  href="#"
                  aria-label="groups"
                >
                  编辑
                </CrumbLink>
              ),
            },
            element: <GroupEditor />,
          },
        ],
      },
      {
        path: RouterPaths.orgs,
        element: <Orgs />,
        children: [{ index: true, element: <OrgTable /> }],
      },
      {
        path: RouterPaths.authorities,
        element: <Authorities />,
        children: [{ index: true, element: <AuthorityTable /> }],
      },
      {
        path: RouterPaths.namespaces,
        element: <Namespaces />,
        children: [{ index: true, element: <NamespaceTable /> }],
      },
      {
        path: RouterPaths.users,
        element: <Users />,
        children: [{ index: true, element: <UserTable /> }],
      },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const useEnhancedEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export default function JoyOrderDashboardTemplate() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          return !(
            error?.response?.status >= 400 && error?.response?.status <= 500
          );
        },
        onError(error) {
          toast.custom((t) => (
            <Alert
              key={""}
              sx={{ alignItems: "flex-start" }}
              startDecorator={<ReportIcon />}
              variant="soft"
              color={"warning"}
              endDecorator={
                <IconButton variant="soft" color={"warning"}>
                  <CloseRoundedIcon />
                </IconButton>
              }
            >
              <div>
                <div>访问失败</div>
                <Typography level="body-sm" color={"warning"}>
                  {error?.response?.data?.message}
                </Typography>
              </div>
            </Alert>
          ));
        },
      },
    },
  });
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
          <Outlet />
        </Box>
      </CssVarsProvider>      
    );
  }

  return (
    <React.Fragment>
      <Toaster />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {localStorage.getItem("Access-Token") === null ? (
            <LoginPage />
          ) : (
            <Dashboard />
          )}
        </QueryClientProvider>
      </Provider>
    </React.Fragment>
  );
}
