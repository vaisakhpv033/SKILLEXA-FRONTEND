'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useState } from 'react'
import { courseFallbackImgUrl } from '@/constants';
import { Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/useCartStore';


const Cart = () => {
  const { items: cartItems, removeItem, getTotalPrice, getItemsCount } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);


  const handleRemoveItem = (id) => {
    // call API to remove item from cart
    // Remove item from cart state
    removeItem(id);
  }
  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:py-6 lg:py-8 sm:px-2 lg:px-4 gap-4">
      {isProcessing && (
        <div className="fixed cursor-wait z-50 top-0 h-screen w-full inset-0 bg-transparent backdrop-blur-md bg-opacity-50 flex items-center justify-center">
            <p className='animate-pulse'>Processing...</p>
          
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between">
        <motion.div
          className='flex-1 p-2'
          layout 
          animate={{ opacity: 1 }}
          transition={{
            opacity:{ease: 'linear'},
            layout: {duration: 0.3}
          }}
        >

          <div className="flex-1">
            <Card className="border-none">
              <CardHeader>
                <CardTitle className="font-bold text-xl md:text-3xl">My Cart</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                    >

                      <li className="border rounded-md p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-32 h-20 rounded-md overflow-hidden">
                            <Image
                              src={item?.course_thumbnail ||courseFallbackImgUrl}
                              alt={item.course_title}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.course_title}</h3>
                            <p className="text-sm text-muted-foreground">{item.course_subtitle}</p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-medium">₹{item.course_price}</span>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    </motion.div>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <div className="flex-1 sm:max-w-sm p-2">
          <Card className="border-none rounded-sm">
            <CardHeader>
              <CardTitle className="font-bold text-xl md:text-3xl">Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-xl font-bold">{getTotalPrice().toLocaleString('en-IN', {style:'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
              </div>
              <Separator className="my-4" />
              <motion.div
                whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.7 }}
              >
                <Button className="w-full">
                  Proceed to Payment
                  </Button>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}

export default Cart