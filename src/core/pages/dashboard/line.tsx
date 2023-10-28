import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const labels = [
    "Sep 2023",
    "Oct 2023",
    "Nov 2023",
    "Dic 2023",
    "Ene 2024",
    "Feb 2024",
    "Mar 2024",
    "Abr 2024",
    "May 2024",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Ingresos",
        data: [90000, 101000, 150000],
        backgroundColor: "#4F3981",
        barThickness: 20,
        borderRadius: 10,
      },
    ],
  };
  const DISPLAY = true;
  const BORDER = true;
  const CHART_AREA = true;
  const TICKS = true;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          value1: {
            type: "line",
            yMin: 0,
            yMax: 0,
            borderColor: "black",
            borderWidth: 2,
            value: 0,
            label: {
              content: "Value",
              enabled: true,
              position: "top",
            },
          },
        },
      },
    },
    scales: {
      x: {
        border: {
          display: BORDER,
        },
        grid: {
          color: "#f5fafa",
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: "#f5fafa",
        },
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
