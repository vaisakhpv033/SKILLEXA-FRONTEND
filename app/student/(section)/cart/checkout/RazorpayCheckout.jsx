'use client'
import React from 'react'
import { courseFallbackImgUrl } from '@/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useCartStore } from '@/store/useCartStore';

const RazorpayCheckout = ({ orderdata }) => {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const router = useRouter();
  const { clearCart } = useCartStore();

  const initializeRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      toast.error('Razorpay SDK failed to load. Please try again later.');
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: parseInt(orderdata.total) * 100, // Amount in paise
      currency: 'INR',
      name: 'Skillexa',
      description: 'Purchase Course',
      order_id: orderdata.razorpay_order_id,
      handler: async function (response) {
        setIsProcessing(true);
        console.log(response);
        // Handle successful payment here
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
        const paymentData = {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          order_id: orderdata.id,
        };

        try{
          const res = await fetch('/api/student/cart/razorpay', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
          });
          const data = await res.json();
          console.log(data);
          if (!res.ok) {
              throw new Error(data?.error || 'Payment verification failed.');
          }
          // Clear the cart after successful payment
          clearCart();

          // Redirect to the my-learning page
          router.push('/student/my-learning');
          toast.success('Payment successful! Redirecting to your courses...');
        } catch (error) {
          setIsProcessing(false);
          console.error('Payment verification error:', error);
          toast.error('Payment verification failed. Please try again.');
        }
      },
      theme: {
        color: '#F97316',
      },
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }
      document.body.appendChild(script);
    })
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      {isProcessing && (
        <div className="fixed cursor-wait z-50 top-0 h-screen w-full inset-0 bg-transparent backdrop-blur-md bg-opacity-50 flex items-center justify-center">
          <p className='animate-pulse'>Processing...</p>

        </div>
      )}
      <div className="flex-1">
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="font-bold text-xl md:text-3xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className='space-y-4'>
              {orderdata.items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                >

                  <li className="border rounded-md p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-10 rounded-md overflow-hidden">
                        <Image
                          src={item?.course_thumbnail || courseFallbackImgUrl}
                          alt={item.course_title}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.course_title}</h3>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-medium">₹{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </motion.div>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 sm:max-w-sm p-2">
        <Card className="border-none rounded-sm">
          <CardHeader>
            <CardTitle className="font-bold text-xl md:text-3xl">Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">₹{orderdata.total}</span>
            </div>
            <Separator className="my-4" />
            <motion.div
              whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.7 }}
            >
              <Button onClick={initializeRazorpay} className="w-full">Buy Now</Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RazorpayCheckout