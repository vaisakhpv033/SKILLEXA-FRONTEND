
import React from 'react';
import DashboardClockCard from './DashboardClockCard';
import InstructorStatsCard from './InstructorStats';
import { getdashBoardItems } from '@/lib/client/dashboard';


const dashboardData = {
  total_courses_created: 6,
  total_courses_published: 4,
  total_enrollments: 1,
  total_earnings: 249.5,
  locked_earnings: 249.5,
  top_enrolled_courses: [
    { course__id: 71, course__title: "DataStructures and Algorithms using Python", enrollments: 1 },
    { course__id: 72, course__title: "Mastering React", enrollments: 0 },
    { course__id: 73, course__title: "Node.js for Beginners", enrollments: 0 },
    { course__id: 74, course__title: "Python Basics", enrollments: 0 },
    { course__id: 75, course__title: "Advanced Algorithms", enrollments: 0 }
  ]
};

export default async function InstructorDashboard () {
  const dashboardData = await getdashBoardItems()

  return (
    <div className='flex px-10 pt-3 size-full flex-col gap-2 text-white'>
      <DashboardClockCard />
      <InstructorStatsCard data={dashboardData} />
    </div>
  );
};

