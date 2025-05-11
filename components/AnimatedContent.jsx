'use client';
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import Image from 'next/image';

const AnimatedButton = ({buttonText, handleClick, redirectLink}) => {
    const router = useRouter();
    return (
        <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
        >
            <Button onClick={redirectLink ? () => router.push(redirectLink) :handleClick} size="lg" className="w-full sm:w-auto">
                {buttonText}
            </Button>
        </motion.div>
    )
}

export default AnimatedButton


export const AnimatedImage = ({imgUrl, altText}) => {
    return (
        <motion.div
            
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Image
                src={imgUrl}
                alt={altText || "image"}
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-auto"
                priority
            />
        </motion.div>
    )
}