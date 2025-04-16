import React from 'react';
import { Separator } from '@/components/ui/separator';
import { getAdminOrderData } from '@/lib/server/adminOrderHistory';
import OrderHistory from './OrderHistory';

export default async function AdminOrderHistory() {
  const orderData = await getAdminOrderData();

  if (!orderData || orderData.results.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
        <h1 className='text-3xl lg:text-4xl font-bold max-sm:text-2xl'>No Orders Found</h1>
      </div>
    );
  }

  const orders = orderData.results.flatMap((order) =>
    order.items.map((item) => ({
      orderId: order.id,
      orderNumber: order.order_number,
      createdAt: order.created_at,
      status: order.status,
      paymentMethod: order.payment.payment_method,
      paymentStatus: order.payment.status,
      transactionId: order.payment.gateway_transaction_id,
      userEmail: order.user.email,
      userName: order.user.full_name,
      courseId: item.course,
      courseTitle: item.course_title,
      price: item.price,
      instructorEmail: item.instructor,
      instructorEarning: item.instructor_earning,
      adminEarning: item.admin_earning,
    }))
  );

  return (
    <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-2xl">Admin Order History</h1>
      </div>
      <Separator className="my-4" />

      <div className="grid gap-4">
        {orders.map((order, index) => (
          <OrderHistory key={index} order={order} />
        ))}
      </div>
    </section>
  );
}
