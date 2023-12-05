import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import RouterBreadCrumbs from "@/components/RouterBreadcrumbs";

import { Outlet } from 'react-router-dom';

export default function Authorities() {
return (
    <Box
    component="main"
    className="MainContent"
    sx={{
      px: {
        xs: 2,
        md: 6,
      },
      pt: {
        xs: 'calc(12px + var(--Header-height))',
        sm: 'calc(12px + var(--Header-height))',
        md: 3,
      },
      pb: {
        xs: 2,
        sm: 2,
        md: 3,
      },
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      height: '100dvh',
      gap: 1,
    }}
  >
     <Box sx={{ display: "flex", alignItems: "center" }}>
        <RouterBreadCrumbs />
      </Box>
    <Box
      sx={{
        display: 'flex',
        my: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography level="h2">权限</Typography>
    </Box>
    <Outlet />
  </Box>
)
}