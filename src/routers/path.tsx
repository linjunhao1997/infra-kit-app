import Link from "@mui/joy/Link"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

 export const RouterPaths = {
    groups:"iam/groups",
    users: "iam/users",
    authorities: "iam/authorities",
    orgs: "iam/orgs",
    namespaces: "iam/namespaces",
    orders: "iam/orders"
}

interface Breadcrumb {
    component: any
}

export const PathLables = new Map([
    ['', {
        component: (): any => {
            return (
                <Link
                underline="none"
                color="neutral"
                href="#"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
            )
        }
    }],
    ['iam', {
        label: '身份与访问',
        component: (): any => {
            return (
                <Link
            underline="none"
            color="neutral"
            href="#"
            fontSize={12}
            fontWeight={500}
          >
            身份与访问
          </Link>
            )
        }
    }],
    ['groups', {
        label: '用户组',
        component: (): any => {
            return (
                <Link
            underline="hover"
            color="neutral"
            href={RouterPaths.groups}
            fontSize={12}
            fontWeight={500}
          >
            身份与访问
          </Link>
            )
        }
    }],
    [':updateId', {
        label: '用户组',
        component: (): any => {
            return (
                <Link
            underline="none"
            color="neutral"
          >
            编辑
          </Link>
            )
        }
    }],
   
])
