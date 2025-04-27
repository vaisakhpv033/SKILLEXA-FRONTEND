'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle,
  Users,
  DollarSign,
  Lock,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card className="w-full shadow-md border-none">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-xl font-bold text-foreground">{value}</div>
    </CardContent>
  </Card>
);

const TopCoursesTable = ({ courses }) => (
  <Card className="w-full shadow-md border-none">
    <CardHeader>
      <CardTitle className="text-base font-semibold">Top Enrolled Courses</CardTitle>
      <CardDescription>Based on total student enrollments</CardDescription>
    </CardHeader>
    <CardContent>
      {courses?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">#</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Enrollments</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course, idx) => (
              <TableRow key={course.course__id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{course.course__title}</TableCell>
                <TableCell>{course.enrollments}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-muted-foreground text-sm">No course data available</p>
      )}
    </CardContent>
  </Card>
);

const InstructorStatsCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard icon={BookOpen} title="Courses Created" value={data.total_courses_created} color="text-blue-500" />
        <StatCard icon={CheckCircle} title="Published" value={data.total_courses_published} color="text-green-500" />
        <StatCard icon={Users} title="Enrollments" value={data.total_enrollments} color="text-orange-500" />
        <StatCard icon={DollarSign} title="Total Earnings" value={`₹${data.total_earnings}`} color="text-yellow-500" />
        <StatCard icon={Lock} title="Locked Earnings" value={`₹${data.locked_earnings}`} color="text-red-500" />
      </div>

      {/* Top Courses Section */}
      <TopCoursesTable courses={data.top_enrolled_courses} />
    </div>
  );
};

export default InstructorStatsCard;
