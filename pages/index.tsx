import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { QuickLink } from "../components/QuickLink";
import useSWR from "swr";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const drawerWidth = 350;

function Repositories():JSX.Element {
  const url = "https://api.github.com/search/repositories?q=user:ManuTheCoder";
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );
  if (error) return <>An error occcured while fetching your repositories</>;
  if (!data) {
    return (
      <Grid container spacing={2} sx={{ my: 2 }}>
        {[...new Array(6)].map(() => (
          <Grid item xs={12} sm={6} md={4}>
            <Skeleton
              variant="rectangular"
              height={80}
              sx={{ borderRadius: 3, width: "100%" }}
              animation="wave"
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {data.items.map((repo: any) => (
          <Grid item xs={12} sm={6} md={4}>
            <ListItem
              button
              sx={{
                transition: "transform .2s",
                borderRadius: 3,
                overflow: "hidden",
                "&:hover": { backdropFilter: "blur(1px)" },
                "&:active": { transform: "scale(.98)", transition: "none" },
                "& *:not(.MuiTouchRipple-root,.MuiTouchRipple-root *)": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  maxWidth: "100%",
                  textOverflow: "ellipsis"
                }
              }}
            >
              <ListItemText
                primary={repo.name}
                secondary={
                  repo.description !== null
                    ? repo.description.trim() === ""
                      ? "No description provided"
                      : repo.description.substring(20)
                    : "No description provided"
                }
              />
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

function ComingSoon() {
  return (
    <Box
      sx={{
        height: 250,
        background: "rgba(255,255,255,.2)",
        backdropFilter: "blur(10px)",
        borderRadius: 5,
        my: 3
      }}
    ></Box>
  );
}

export default function Render() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            background: "transparent",
            backdropFilter: "blur(10px)",
            borderColor: "rgba(255,255,255,.1)",
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", p: 3 }}>
          <Typography className="font-heading" variant="h5">
            Recent changes
          </Typography>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography className="font-heading" variant="h5">
          Quick links
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3, mt: 0 }}>
          <QuickLink
            href="https://postman.com"
            name="Postman"
            icon="https://user-images.githubusercontent.com/7853266/44114706-9c72dd08-9fd1-11e8-8d9d-6d9d651c75ad.png"
          />
          <QuickLink
            href="https://github.com"
            name="GitHub"
            icon="https://i.ibb.co/8YSwyJh/github-white.png"
          />
          <QuickLink
            href="https://smartlist.tech"
            name="Smartlist"
            icon="https://cdn.jsdelivr.net/gh/Smartlist-App/Assets@master/img/logo/128x128.png"
          />
          <QuickLink
            href="https://manuthecoder.ml"
            name="Personal website"
            icon="https://avatars.githubusercontent.com/u/77016441?v=4"
          />
        </Grid>
        <Typography className="font-heading" variant="h5">
          Repositories
        </Typography>
        <Repositories />
        <Typography className="font-heading" variant="h5">
          News
        </Typography>
        <ComingSoon />
      </Box>
    </>
  );
}
