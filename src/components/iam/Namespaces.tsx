import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
// icons
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import RouterBreadCrumbs from "@/components/RouterBreadcrumbs";


import NamespaceTable from '@/components/NamespaceTable';

export default function Namespaces() {
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
      <Typography level="h2">命名空间</Typography>
      <Button
        color="primary"
        startDecorator={<DownloadRoundedIcon />}
        size="sm"
      >
        Download PDF
      </Button>
    </Box>
    <NamespaceTable />
  </Box>
)
}