"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { Snackbar, Alert } from "@mui/material";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Paper,
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [successOpen, setSuccessOpen] = useState(false);
  const [form, setForm] = useState({
    village: "",
    waterQuality: "",
    airQuality: "",
    forestHealth: "",
    alert: "",
  });

  useEffect(() => {
    fetch("/api/environment")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async () => {
    await fetch("/api/environment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        waterQuality: Number(form.waterQuality),
        airQuality: Number(form.airQuality),
        forestHealth: Number(form.forestHealth),
      }),
    });

   const updated = await fetch("/api/environment").then((r) => r.json());
    setData(updated);

    // ✅ SHOW SUCCESS POPUP
    setSuccessOpen(true);

    // OPTIONAL: reset form
    setForm({
      village: "",
      waterQuality: "",
      airQuality: "",
      forestHealth: "",
      alert: "",
    });
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f4f6f8" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        {/* TOPBAR */}
        <AppBar position="static" sx={{ background: "#1976d2" }}>
          <Toolbar>
            <Typography variant="h6">🌱 Veridian Sentinel</Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          {/* SUMMARY CARDS */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              gap: 2,
              mb: 3,
            }}
          >
            {[
              { label: "Water", value: "72%", color: "#2196f3" },
              { label: "Air", value: "58%", color: "#4caf50" },
              { label: "Forest", value: "81%", color: "#8bc34a" },
              { label: "Alerts", value: "3", color: "#f44336" },
            ].map((item) => (
              <Card
                key={item.label}
                sx={{ borderLeft: `6px solid ${item.color}` }}
              >
                <CardContent>
                  <Typography color="textSecondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h5">{item.value}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* FORM */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }} elevation={3}>
            <Typography variant="h6" gutterBottom>
              Add Environmental Data
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 2,
              }}
            >
              <TextField
                label="Village"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, village: e.target.value })
                }
              />

              <TextField
                label="Water Quality"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, waterQuality: e.target.value })
                }
              />

              <TextField
                label="Air Quality"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, airQuality: e.target.value })
                }
              />

              <TextField
                label="Forest Health"
                fullWidth
                onChange={(e) =>
                  setForm({ ...form, forestHealth: e.target.value })
                }
              />

              <TextField
                label="Alert"
                fullWidth
                sx={{ gridColumn: "span 2" }}
                onChange={(e) =>
                  setForm({ ...form, alert: e.target.value })
                }
              />
            </Box>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Submit Data
            </Button>
          </Paper>

          <Snackbar
            open={successOpen}
            autoHideDuration={3000}
            onClose={() => setSuccessOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={() => setSuccessOpen(false)}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              ✅ Data successfully added!
            </Alert>
          </Snackbar>

          {/* DATA DISPLAY */}
          {/* <Typography variant="h6" gutterBottom>
            Stored Data
          </Typography> */}

          {/* <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            {data.length === 0 ? (
              <Typography>No data available</Typography>
            ) : (
              data.map((item: any) => (
                <Card key={item._id} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {item.village}
                    </Typography>
                    <Typography>💧 Water: {item.waterQuality}</Typography>
                    <Typography>🌫 Air: {item.airQuality}</Typography>
                    <Typography>🌳 Forest: {item.forestHealth}</Typography>
                    <Typography>⚠️ Alert: {item.alert}</Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}