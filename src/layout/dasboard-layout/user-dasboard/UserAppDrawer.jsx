import { Box, Drawer, Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserNavList from "./UserNavList";

const drawerWidth = 240;
const style = {
  display: { xs: "block", md: "none" },
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: drawerWidth
  }
};

const UserNavDrawer = props => {
  const { mobileOpen, handleDrawerToggle, window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
      sx={style}
    >
      <Box
        padding={`0 1rem`}
        onClick={handleDrawerToggle}
        sx={{ textAlign: "center" }}
      >
        <Stack
          direction={`row`}
          padding={`1rem`}
          alignItems={`center`}
          height={`120px`}
        >
          <Link to={`/`}>
            <img
              src="https://res.cloudinary.com/kingsleysolomon/image/upload/v1668735681/hng/todoAppVirtualAssistant/Frame_34483_msotkx.svg"
              alt="logo"
            />
          </Link>
        </Stack>
        <UserNavList />
      </Box>
    </Drawer>
  );
};

export default UserNavDrawer;
