// app/admin/dashboard/page.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Users, Book, DollarSign, BarChart } from "lucide-react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ErrorComponent from "@/components/ErrorComponent";
import { useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function formatCurrencyShort(amount) {
    if (amount >= 1_000_000_000) return `₹${(amount / 1_000_000_000).toFixed(1)}B`;
    if (amount >= 1_000_000) return `₹${(amount / 1_000_000).toFixed(1)}M`;
    if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(1)}K`;
    return `₹${amount}`;
  }
  

export default function AdminDashboard({ data }) {

    const {
        total_students,
        active_students,
        total_instructors,
        active_instructors,
        published_courses,
        pending_courses,
        total_enrollments,
        cancelled_enrollments,
        total_revenue,
    } = data;

    const blocked_students = total_students - active_students;
    const blocked_instructors = total_instructors - active_instructors;
    const total_courses = published_courses + pending_courses;

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: "currentColor",
                },
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    const chartConfigs = [
        {
            title: "Students Overview",
            icon: <Users className="text-blue-500 dark:text-blue-400" />,
            data: {
                labels: ["Active", "Blocked"],
                datasets: [
                    {
                        data: [active_students, blocked_students],
                        backgroundColor: ["#3b82f6", "#e5e7eb"],
                        hoverOffset: 4,
                    },
                ],
            },
        },
        {
            title: "Instructors Overview",
            icon: <Users className="text-green-500 dark:text-green-400" />,
            data: {
                labels: ["Active", "Blocked"],
                datasets: [
                    {
                        data: [active_instructors, blocked_instructors],
                        backgroundColor: ["#10b981", "#e5e7eb"],
                        hoverOffset: 4,
                    },
                ],
            },
        },
        {
            title: "Courses Overview",
            icon: <Book className="text-purple-500 dark:text-purple-400" />,
            data: {
                labels: ["Published", "Pending"],
                datasets: [
                    {
                        data: [published_courses, pending_courses],
                        backgroundColor: ["#8b5cf6", "#e5e7eb"],
                        hoverOffset: 4,
                    },
                ],
            },
            subtitle: `Total: ${total_courses}`,
        },
        {
            title: "Enrollments Overview",
            icon: <BarChart className="text-yellow-500 dark:text-yellow-400" />,
            data: {
                labels: ["Total", "Cancelled"],
                datasets: [
                    {
                        data: [total_enrollments, cancelled_enrollments],
                        backgroundColor: ["#f59e0b", "#e5e7eb"],
                        hoverOffset: 4,
                    },
                ],
            },
        },
    ];

    return (
        <section className="py-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {chartConfigs.map((config, index) => (
                <Card
                key={index}
                className="w-full mx-auto transition-shadow hover:shadow-md dark:bg-gray-900"
              >
                <CardHeader className="flex items-center space-x-3 p-3">
                  {config.icon}
                  <div>
                    <CardTitle className="text-sm font-medium">{config.title}</CardTitle>
                    {config.subtitle && (
                      <p className="text-xs text-muted-foreground">{config.subtitle}</p>
                    )}
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex justify-center items-center p-3">
                  <div className="h-40 w-40">
                    <Doughnut data={config.data} options={chartOptions} />
                  </div>
                </CardContent>
              </Card>
              
            ))}

            <Card className="max-w-md w-full mx-auto transition-shadow hover:shadow-md dark:bg-gray-900">
                <CardHeader className="flex items-center space-x-3 p-4">
                    <div>
                        <CardTitle className="text-base font-medium">Total Revenue</CardTitle>
                        <p className="text-sm text-muted-foreground">All Time</p>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex justify-center items-center p-3">
                    <div className="flex justify-center items-center text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrencyShort(total_revenue)}
                    </div>
                </CardContent>
            </Card>
        </section>

    );
}
