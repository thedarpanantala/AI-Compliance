"use client";

import { Line, Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, Filler);

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: "bottom" as const },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false }, beginAtZero: true },
  },
};

export function FrameworkProgressChart() {
  return (
    <div className="h-64">
      <Line
        data={{
          labels: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
          datasets: [
            { label: "EU AI Act", data: [50, 54, 58, 63, 67, 72], borderColor: "#7C3AED" },
            { label: "DPDPA", data: [42, 44, 47, 51, 56, 61], borderColor: "#2563EB" },
            { label: "CDSCO", data: [25, 27, 31, 34, 36, 40], borderColor: "#EA580C" },
          ],
        }}
        options={baseOptions}
      />
    </div>
  );
}

export function DeadlinesChart() {
  return (
    <div className="h-64">
      <Bar
        data={{
          labels: ["NABH", "GPCB CTO", "DPDPA Review", "AERB Licence"],
          datasets: [
            { label: "Progress to deadline", data: [30, 55, 78, 12], backgroundColor: "#7C3AED" },
          ],
        }}
        options={{
          ...baseOptions,
          indexAxis: "y" as const,
          plugins: { ...baseOptions.plugins, legend: { display: false } },
          scales: {
            x: { max: 100, grid: { display: false } },
            y: { grid: { display: false } },
          },
        }}
      />
    </div>
  );
}
