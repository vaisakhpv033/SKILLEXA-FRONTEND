"use client"
import React, {useState, useEffect} from 'react'
import { Button } from './ui/button';

const OtpTimer = ({initialTime = 180, onResend}) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [canResend, setCanResend] = useState(false);

    // timer logic 
    useEffect( () => {
        if (timeLeft === 0) {
            setCanResend(true);
            return;
        }

        const timerId = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);

        return  () => clearTimeout(timerId);
    }, [timeLeft])

    const handleResend = () => {
        if (!canResend) return; 

        // reset timer
        setTimeLeft(initialTime);
        setCanResend(false);

        if (onResend) onResend();

    }

    // format time 
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds/60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

  return (
    <div className="flex flex-col items-center justify-center">
        {canResend ? <Button variant="ghost" onClick={handleResend}>Resend OTP</Button> : <p className='text-[1rem] text-secondary-foreground'>Resend otp in {formatTime(timeLeft)}</p>}
    </div>
  )
}

export default OtpTimer