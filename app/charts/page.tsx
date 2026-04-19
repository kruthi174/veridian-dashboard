"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function ChartsPage() {
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
          Environmental Charts
        </Typography>

        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Village Comparison
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="village" />
              <YAxis />

              <Tooltip />
              <Legend />

              <Bar dataKey="waterQuality" fill="#2196f3" name="Water" />
              <Bar dataKey="airQuality" fill="#4caf50" name="Air" />
              <Bar dataKey="forestHealth" fill="#8bc34a" name="Forest" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Box>
  );
}