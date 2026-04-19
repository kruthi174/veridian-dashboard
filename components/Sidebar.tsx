"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorageIcon from "@mui/icons-material/Storage";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function Sidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "Stored Data", path: "/data", icon: <StorageIcon /> },
    { name: "Charts", path: "/charts", icon: <BarChartIcon /> },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 1300,
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* MOBILE DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <Box sx={{ width: 240 }}>
          <List>
            {menu.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(item.path);
                    setOpen(false);
                  }}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    my: 0.5,
                  }}
                >
                  {item.icon}
                  <ListItemText primary={item.name} sx={{ ml: 1 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* DESKTOP SIDEBAR */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          {menu.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton onClick={() => router.push(item.path)}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: "auto", p: 2 }}>
  <ListItemButton
    onClick={() => {
      localStorage.removeItem("isLoggedIn");
      router.push("/login");
    }}
    sx={{ borderRadius: 2 }}
  >
    <ListItemText primary="Logout" />
  </ListItemButton>
</Box>
      </Drawer>
    </>
  );
}