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
import { Link, Outlet, createBrowserRouter } from "react-router-dom";
import Orgs from "./components/iam/Orgs";
import Users from "./components/iam/Users";
import Authorities from "./components/iam/Authorities";
import Namespaces from "./components/iam/Namespaces";
import toast, { Toaster } from "react-hot-toast";
import GroupUpdater from "@/components/GroupUpdater";
import GroupTable from "@/components/GroupTable";
import Groups from "./components/iam/Groups";
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

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <JoyOrderDashboardTemplate />,
    handle: {
      crumb: () => (
        <CrumbLink underline="hover" color="neutral" href="/" aria-label="Home">
          <HomeRoundedIcon />
        </CrumbLink>
      ),
    },
    children: [
      {
        element: <IAM />,
        handle: {
          crumb: () => (
            <CrumbLink
              underline="none"
              color="neutral"
              href="#"
              aria-label="iam"
            >
              身份与访问
            </CrumbLink>
          ),
        },
        children: [
          {
            path: RouterPaths.groups,
            element: <Groups />,
            handle: {
              crumb: () => (
                <Link
                  to={paths.groups}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  用户组
                </Link>
              ),
            },
            children: [
              {
                index: true,
                element: <GroupTable />,
              },
              {
                path: ":id",
                element: <GroupUpdater />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="edit"
                    >
                      编辑
                    </CrumbLink>
                  ),
                },
              },
            ],
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

function IAM() {
  return <Outlet />;
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
          toast.error(
            error?.response?.statusText +
              " " +
              (error?.response?.data?.message || "请求异常")
          );
        },
      },
      mutations: {
        onSuccess() {
          toast.success("success");
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
