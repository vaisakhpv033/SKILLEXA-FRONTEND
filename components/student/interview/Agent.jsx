import Image from 'next/image'
import React from 'react'
import { cn } from '@/lib/utils'

const CallStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    CONNECTING: 'CONNECTING',
    FINISHED: 'FINISHED'
}

const Agent = ({userName, userId, type}) => {
    const callStatus = CallStatus.CONNECTING;
    const isSpeaking = true;
    const messages = [
        "What's your name",
        "My name is John Doe, nice to meet you"
    ]
    const lastmessage = messages[messages.length - 1];
  return (
    <>
        <div className='call-view'>
            <div className='card-interviewer'>
                <div className='avatar'>
                    <Image src='/images/ai-avatar.png' alt="vapi" width={65} height={54} className='object-cover' />
                    {isSpeaking && <span className='animate-speak animate-ping'/>}
                </div>
                <h3>AI Interviewer</h3>
            </div>

            <div className='card-border'>
                <div className='card-content'>
                    <Image src='/images/user-avatar.png' alt='user avatar' width={540} height={540} className='rounded-full object-cover size-[120px]' />
                    <h3>{userName}</h3>
                </div>
            </div>
        </div>

        {messages.length > 0 && (
            <div className='transcript-border'>
                <div className='transcript'>
                    <p key={lastmessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                        {lastmessage}
                    </p>
                </div>
            </div>
        )}
        <div className='w-full flex justify-center'>
            {callStatus != 'ACTIVE' ? (
                <button className='relative btn-call'>
                    <span>
                        {callStatus === 'INACTIVE' || callStatus === 'FINISHED' ? 'Call' : '...'}
                    </span>
                    <span className={cn('absolute  rounded-full opacity-75 animate-ping', callStatus != 'CONNECTING' & 'hidden')} />
                </button>
            ):(
                <button className='btn-disconnect'>
                    End
                </button>
            )}
        </div>
    </>
  )
}

export default Agent