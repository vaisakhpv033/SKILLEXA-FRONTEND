export const dynamic = 'force-dynamic';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { getOrderData } from '@/lib/server/studentOrderHistory';
import CancelOrder from './CancelOrder';
import Link from 'next/link';

export default async function PurchaseHistory() {
  const orderData = await getOrderData();

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
      courseId: item.course,
      courseTitle: item.course_title,
      price: item.price,
      instructorEarning: item.instructor_earning,
      adminEarning: item.admin_earning,
      orderItemId: item.id,
      refundAmount: item.refund_amount,
      refundCompleted: item.refund_completed_at,
    }))
  );

  return (
    <section className="w-full max-w-7xl lg:p-4 mx-auto max-lg:p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl lg:text-4xl font-bold max-sm:text-2xl">Order History</h1>
      </div>
      <Separator className="my-4" />

      <div className="grid gap-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className="border rounded-2xl p-4 shadow-sm bg-white dark:bg-zinc-900"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <Link href={`/student/course/${order.courseId}/${order.courseTitle}`}><h2 className="text-xl font-semibold">{order.courseTitle}</h2></Link>
                <div className='flex gap-2'>
                  <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
                  {!order.refundAmount && new Date().getTime() - new Date(order.createdAt).getTime() <= 14 * 24 * 60 * 60 * 1000 && (
                      <CancelOrder orderItem={order.orderItemId} />
                  )}
                </div>
              </div>
              {order.refundAmount ? (
                <div className="text-sm text-right">
                  <p className="text-muted-foreground">{new Date(order.refundCompleted).toLocaleString()}</p>
                  <p className="font-medium capitalize text-red-500">Cancelled</p>
                </div>

              ) : (

                <div className="text-sm text-right">
                  <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                  <p className="font-medium capitalize text-green-500">{order.status}</p>
                </div>
              )}
            </div>

            <Separator className="my-2" />

            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="font-medium">₹{order.price}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Payment Method</p>
                <p className="font-medium">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Transaction ID</p>
                <p className="font-medium break-all">{order.transactionId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Payment Status</p>
                <p className="font-medium capitalize">{order.paymentStatus}</p>
              </div>

              {order.refundAmount && (
                <div>
                  <p className="text-muted-foreground">Refund Amount</p>
                  <p className="font-medium">₹{order.refundAmount}</p>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
