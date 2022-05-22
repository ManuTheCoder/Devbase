import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";

export function QuickLink({ name, href, icon }) {
  return (
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
        <ListItemAvatar>
          <Avatar src={icon} />
        </ListItemAvatar>
        <ListItemText primary={name} secondary={href} />
      </ListItem>
    </Grid>
  );
}
