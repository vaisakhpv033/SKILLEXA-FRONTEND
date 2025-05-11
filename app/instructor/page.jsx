export const dynamic = "force-dynamic";
import React from 'react';
import DashboardClockCard from './DashboardClockCard';
import InstructorStatsCard from './InstructorStats';
import { getdashBoardItems } from '@/lib/client/dashboard';



export default async function InstructorDashboard () {
  const dashboardData = await getdashBoardItems()

  return (
    <div className='flex px-10 pt-3 size-full flex-col gap-2 text-white'>
      <DashboardClockCard />
      <InstructorStatsCard data={dashboardData} />
    </div>
  );
};

