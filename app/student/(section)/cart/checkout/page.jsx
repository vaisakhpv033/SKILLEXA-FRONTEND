
import React from 'react'
import { CreateOrder } from '@/lib/server/CreateOrder';
import { redirect } from 'next/navigation';
import RazorpayCheckout from './RazorpayCheckout';



export default async function Checkout() {
  const orderdata = await CreateOrder();
  console.log(orderdata);
  if (!orderdata) {
    redirect('/student/cart?error=order_creation_failed');
  } 

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
        <RazorpayCheckout orderdata={orderdata} />
    </div>
  );
}