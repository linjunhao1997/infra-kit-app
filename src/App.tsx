import "@fontsource/inter";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import useScript from "./useScript";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import LoginPage from "./pages/LoginPage";

import { useDispatch, useSelector } from "react-redux";
import  { RootState } from "./store";
import { QueryClient, QueryClientProvider } from "react-query";
import { Link, Outlet, createBrowserRouter } from "react-router-dom";
import Orgs from "./components/iam/Orgs";
import Authorities from "./components/iam/Authorities";
import toast, { Toaster } from "react-hot-toast";
import GroupUpdater from "@/components/iam/GroupUpdater";
import GroupTable from "@/components/iam/GroupTable";
import Groups from "./components/iam/Groups";
import OrgTable from "./components/iam/OrgTable";
import AuthorityTable from "./components/iam/AuthorityTable";
import { RouterPaths } from "./routers/path";
import CrumbLink from "@mui/joy/Link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AuthorityCreator from "./components/iam/AuthorityCreator";
import Users from "./components/iam/Users";
import UserTable from "./components/iam/UserTable";
import Namespaces from "./components/iam/Namespaces";
import NamespaceTable from "./components/iam/NamespaceTable";
import GroupCreator from "./components/iam/GroupCreator";
import { setUserSession } from "./store/userinfo";
import OrgCreator from "./components/iam/OrgCreator";
import UserCreator from "./components/iam/UserCreator";
import NamespaceCreator from "./components/iam/NamespaceCreator";
import AuthorityUpdater from "./components/iam/AuthorityUpdater";
import OrgUpdater from "./components/iam/OrgUpdater";
import UserUpdater from "./components/iam/UserUpdater";
import NamespaceUpdater from "./components/iam/NamespaceUpdater";


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
              {
                path: "create",
                element: <GroupCreator />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="create"
                    >
                      新建
                    </CrumbLink>
                  ),
                },
              },
            ],
          },
          {
            path: RouterPaths.authorities,
            element: <Authorities />,
            handle: {
              crumb: () => (
                <Link
                  to={paths.authorities}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  权限
                </Link>
              ),
            },
            children: [
              {
                index: true,
                element: <AuthorityTable />,
              },
              {
                path: "create",
                element: <AuthorityCreator />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="create"
                    >
                      新建
                    </CrumbLink>
                  ),
                },
              },
              {
                path: ":id",
                element: <AuthorityUpdater />,
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
          {
            path: RouterPaths.orgs,
            element: <Orgs />,
            handle: {
              crumb: () => (
                <Link
                  to={paths.orgs}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  组织
                </Link>
              ),
            },
            children: [
              {
                index: true,
                element: <OrgTable />,
              },
              {
                path: "create",
                element: <OrgCreator />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="edit"
                    >
                      新建
                    </CrumbLink>
                  ),
                },
              },
              {
                path: ":id",
                element: <OrgUpdater />,
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
          {
            path: RouterPaths.users,
            element: <Users />,
            handle: {
              crumb: () => (
                <Link
                  to={paths.users}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  用户
                </Link>
              ),
            },
            children: [
              {
                index: true,
                element: <UserTable />,
              },
              {
                path: "create",
                element: <UserCreator />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="edit"
                    >
                      新建
                    </CrumbLink>
                  ),
                },
              },
              {
                path: ":id",
                element: <UserUpdater />,
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
          {
            path: RouterPaths.namespaces,
            element: <Namespaces />,
            handle: {
              crumb: () => (
                <Link
                  to={paths.namespaces}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  命名空间
                </Link>
              ),
            },
            children: [
              {
                index: true,
                element: <NamespaceTable />,
              },
              {
                path: "create",
                element: <NamespaceCreator />,
                handle: {
                  crumb: () => (
                    <CrumbLink
                      underline="none"
                      color="neutral"
                      href="#"
                      aria-label="edit"
                    >
                      新建
                    </CrumbLink>
                  ),
                },
              },
              {
                path: ":id",
                element: <NamespaceUpdater />,
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
  const userSession = useSelector((state: RootState) => state.userinfo.userSession)
  const dispatch = useDispatch()

  
  if (userSession.orgCode === "") {
    dispatch(setUserSession())
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          if (!(error?.response?.status >= 400 && error?.response?.status <= 501)) {
            if (failureCount < 3) {
              return true
            }
          }
          return  false
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
        onError(error) {
          toast.error(
            error?.response?.statusText +
              " " +
              (error?.response?.data?.message || "请求异常")
          );
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
        <QueryClientProvider client={queryClient}>
          {userSession.accessToken === "" ? (
            <LoginPage />
          ) : (
            <Dashboard />
          )}
        </QueryClientProvider>
    </React.Fragment>
  );
}
