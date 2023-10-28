import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CircleIcon from "@mui/icons-material/Circle";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = () => {
  const data = {
    labels: ["Modulo A", "Modulo B", "Modulo C"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["#210b52", "#f5a321", "#ca064e"],
        borderColor: ["#210b52", "#f5a321", "#ca064e"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    cutout: "75%",
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} />
      <List sx={{ mt: 5 }}>
        <ListItem disablePadding>
          <ListItemIcon>
            <CircleIcon style={{ color: "#210b52" }} />
          </ListItemIcon>
          <ListItemText primary="Modulo A" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <CircleIcon style={{ color: "#f5a321" }} />
          </ListItemIcon>
          <ListItemText primary="Modulo B" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <CircleIcon style={{ color: "#ca064e" }} />
          </ListItemIcon>
          <ListItemText primary="Modulo C" />
        </ListItem>
      </List>
    </>
  );
};
export default CircleChart;
