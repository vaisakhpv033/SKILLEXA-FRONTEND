import React from 'react'
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const OrderHistory = ({order}) => {
  return (
    <div
    className="border rounded-2xl p-4 shadow-sm bg-white dark:bg-zinc-900"
  >
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
      <div>
        <Link href={`/admin/courses/${order.courseId}/${order.courseTitle}`}><h2 className="text-xl font-semibold">{order.courseTitle}</h2></Link>
        <p className="text-sm text-muted-foreground">Order #{order.orderNumber}</p>
      </div>
      <div className="text-sm text-right">
        <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
        <p className="font-medium capitalize">{order.status}</p>
      </div>
    </div>

    <Separator className="my-2" />

    <div className="grid md:grid-cols-3 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">User</p>
        <p className="font-medium">{order.userName} ({order.userEmail})</p>
      </div>
      <div>
        <p className="text-muted-foreground">Instructor</p>
        <p className="font-medium">{order.instructorEmail}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Price</p>
        <p className="font-medium">₹{order.price}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Instructor Earning</p>
        <p className="font-medium">₹{order.instructorEarning}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Admin Earning</p>
        <p className="font-medium">₹{order.adminEarning}</p>
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
    </div>
  </div>
  )
}

export default OrderHistory