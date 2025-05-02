import ErrorComponent from "@/components/ErrorComponent";
import { getAdminDashboardData, getAdminOrderRevenueData } from "@/lib/server/adminDashboard"
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminOrderRevenueData from "@/components/admin/AdminOrderRevenueData";


export default async function page() {
  const response = await getAdminDashboardData();
  const revenueData = await getAdminOrderRevenueData();

  console.log(revenueData);

  if (!response?.success) {
    return <ErrorComponent error={response?.message || "Something went wrong"} />
  }
  console.log(response)
  return (
    <section className="mx-auto max-w-7xl">
      <AdminDashboard data={response.data}/>

      {revenueData && <AdminOrderRevenueData data={revenueData.data} />}


    </section>
  )
}
