'use client'

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { cn } from "@/lib/utils";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminOrderRevenueData({ data }) {
    console.log(data);
  const [view, setView] = useState('daily');

  const dailyLabels = data.last_30days;
  const dailyValues = Array(30).fill(0);
  data.daily_revenue?.forEach((entry) => {
    const formatted = `${String(entry.day).padStart(2, '0')}-${String(entry.month).padStart(2, '0')}`;
    const index = dailyLabels.indexOf(formatted);
    if (index !== -1) {
      dailyValues[index] = entry.total_revenue;
    }
  });

  const monthlyLabels = data.last_12months.map(([month, year]) => `${String(month).padStart(2, '0')}-${year}`);
  const monthlyValues = Array(12).fill(0);
  data.monthly_revevnue?.forEach((entry) => {
    const formatted = `${String(entry.month).padStart(2, '0')}-${entry.year}`;
    const index = monthlyLabels.indexOf(formatted);
    if (index !== -1) {
      monthlyValues[index] = entry.total_revenue;
    }
  });

  const chartData = {
    labels: view === 'daily' ? dailyLabels : monthlyLabels,
    datasets: [
      {
        label: 'Revenue (₹)',
        data: view === 'daily' ? dailyValues : monthlyValues,
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  const maxValue = Math.max(...(view === 'daily' ? dailyValues : monthlyValues), 0);


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.ceil(maxValue * 1.2), // Add padding above the highest bar
        ticks: {
          color: 'currentColor',
          callback: function (value) {
            if (value >= 1_000_000_000) return `₹${value / 1_000_000_000}B`;
            if (value >= 1_000_000) return `₹${value / 1_000_000}M`;
            if (value >= 1_000) return `₹${value / 1_000}K`;
            return `₹${value}`;
          },
        },
      },
      x: {
        ticks: {
          color: 'currentColor',
        },
      },
    },
  };
  

  return (
    <Card className="mt-8 dark:bg-gray-900">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CardTitle className="text-lg font-semibold">Revenue Stats</CardTitle>
        <div className="flex gap-2">
          <Button
            variant={view === 'daily' ? 'default' : 'outline'}
            onClick={() => setView('daily')}
          >
            Last 30 Days
          </Button>
          <Button
            variant={view === 'monthly' ? 'default' : 'outline'}
            onClick={() => setView('monthly')}
          >
            Last 12 Months
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6 pb-6">
        <div className="h-72 w-full overflow-x-auto">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
