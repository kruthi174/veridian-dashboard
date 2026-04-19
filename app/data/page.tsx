"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function DataPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/environment")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <Box sx={{ display: "flex", backgroundColor: "#f4f6f8" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Stored Data
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: 2,
          }}
        >
          {data.map((item: any) => (
            <Card key={item._id} sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">{item.village}</Typography>
                <Typography>💧 Water: {item.waterQuality}</Typography>
                <Typography>🌫 Air: {item.airQuality}</Typography>
                <Typography>🌳 Forest: {item.forestHealth}</Typography>
                <Typography>⚠️ Alert: {item.alert}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}