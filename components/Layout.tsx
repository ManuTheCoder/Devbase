import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import NoSsr from "@mui/material/NoSsr";
import dayjs from "dayjs";

function SettingsSection({ title }: { title: string }) {
  return (
    <Box
      sx={{
        border: "1px solid rgba(255,255,255,.1)",
        mb: 3,
        p: 3,
        borderRadius: 5,
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Skeleton
        variant="rectangular"
        height={100}
        animation="wave"
        sx={{ borderRadius: 5, mt: 3 }}
      />
    </Box>
  );
}

function SettingsPopup() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SwipeableDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        anchor="right"
        PaperProps={{
          sx: {
            boxShadow: 0,
          },
        }}
        BackdropProps={{
          sx: {
            backdropFilter: "blur(10px)",
          },
        }}
        sx={{
          zIndex: 999999,
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "500px",
            maxWidth: "100vw",
            p: 5,
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            disableRipple
            sx={{
              "&:hover": { background: "rgba(255,255,255,.1)" },
              transition: "transform .2s",
              mt: -1,
              float: "right",
              "&:active": {
                transition: "none",
                background: "rgba(255,255,255,.2)",
                transform: "scale(.95)",
              },
            }}
          >
            <span className="material-symbols-rounded">close</span>
          </IconButton>
          <Typography
            className="font-heading"
            variant="h5"
            sx={{ fontWeight: "800" }}
          >
            Settings
          </Typography>
          <br />
          <br />
          <SettingsSection title="Appearance" />
          <SettingsSection title="Account" />
          <SettingsSection title="Layout" />
          <SettingsSection title="Connected accounts" />
          <SettingsSection title="Danger zone" />
          <br />
        </Box>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpen(true)}
        disableRipple
        sx={{
          "&:hover": { background: "rgba(255,255,255,.1)" },
          transition: "transform .2s",
          "&:active": {
            transition: "none",
            background: "rgba(255,255,255,.2)",
            transform: "scale(.95)",
          },
        }}
      >
        <span className="material-symbols-rounded">settings</span>
      </IconButton>
    </>
  );
}

function BottomAppBar() {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(1);
  const [charging, setCharging] = useState(false);
  setInterval(() => {
    if (document.hasFocus()) setTime(new Date());
  }, 1000);
  setInterval(() => {
    const navigatorObj: any = navigator;
    if (document.hasFocus())
      navigatorObj.getBattery().then((res) => {
        setBattery(res.level);
        setCharging(res.charging);
      });
  }, 9000);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        fontSize: "12px",
        background: "rgba(0,0,0,0.1)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,.1)",
        p: 0.5,
        width: "100%",
        display: "flex",
        zIndex: 99999,
      }}
    >
      <Typography sx={{ flexGrow: 1 }}></Typography>{" "}
      <Button disableRipple sx={{ py: 0, transition: "none" }} size="small">
        {battery * 100}%
        <span
          className="material-symbols-rounded"
          style={{ marginLeft: "10px", transform: "scale(.9)" }}
        >
          {charging
            ? "battery_charging_full"
            : battery > 0.9
            ? "battery_6_bar"
            : battery > 0.7
            ? "battery_5_bar"
            : battery > 0.5
            ? "battery_4_bar"
            : battery > 0.3
            ? "battery_3_bar"
            : battery > 0.2
            ? "battery_2_bar"
            : "battery_1_bar"}
        </span>
      </Button>
      <Button disableRipple sx={{ py: 0, transition: "none" }} size="small">
        {dayjs(time.toString()).format("MM/DD/YYYY h:mm:ss A")}
      </Button>
    </Box>
  );
}

export function Layout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(20px)",
          background: "transparent",
          borderBottom: "1px solid rgba(255,255,255,.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: "600", flexGrow: 1 }}
          >
            Devbase
          </Typography>
          <SettingsPopup />
        </Toolbar>
      </AppBar>
      {children}
      <NoSsr>
        <BottomAppBar />
      </NoSsr>
    </Box>
  );
}
