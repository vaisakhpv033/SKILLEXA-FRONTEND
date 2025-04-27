'use client'
import React, {useState} from 'react'
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { requestRefund } from '@/lib/client/requestRefund';
import { Button } from '@/components/ui/button';

const CancelOrder = ({orderItem}) => {
    const [open, setOpen] = useState(false);

    const onSubmit = async () => {
        const response = await requestRefund({"order_item_id": orderItem});

        if (response.status == true) {
            toast.success(typeof response?.result === 'string' ? response.result : "Refund Request Successfully Submitted")
        } else {
            toast.error(typeof response?.result === 'string' ? response.result : "Something went wrong")
        }
        setOpen(false);

    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="px-3 py-2 h-8 text-xs">
                    Cancel Purchase
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        You are going to cancel the course purchase and request for refund
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild><Button onClick={onSubmit} variant="destructive">Request Refund</Button></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default CancelOrder


