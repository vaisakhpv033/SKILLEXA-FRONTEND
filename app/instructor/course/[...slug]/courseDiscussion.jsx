'use client'
import React, {useState} from 'react'
import { useCurriculum } from '@/lib/client/publicCurriculum';
import { useParams } from 'next/navigation';
import MessageCard, {AddModal} from '@/components/student/MessageCad';
import { addComment } from '@/lib/client/publicCurriculum';
import { toast } from 'sonner';

const DiscussionSection = () => {
    const params = useParams();
    const { result, isLoading, isError, mutate } = useCurriculum(`/api/student/course/discussion/?id=${params.slug[0]}`);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSubmit = async (comment) => {
      let data = {
          course: params.slug[0],
          comment: comment,
      }
  
      try {
  
          const response = await addComment(data);
          if (response.status) {
              mutate();
              toast.success("Reply added successfully")
          }else {
              toast.error(response.result || "Failed to add reply")
          }
      }catch (error) {
          toast.error("Error adding reply")
      }
    }
  
    if (isLoading) return <div>Loading messages...</div>;
    if (isError) return <div>Failed to load messages. Please try again later.</div>;
    if (!result || result.length === 0) return (
      <div>
          <h1 className='font-bold'>No messages available yet.</h1>
        <div className='flex justify-between p-2 text-lg'>
          <AddModal
            open={isModalOpen}
            setOpen={setModalOpen}
            title="Add Comment"
            placeholder="Enter your comment"
            buttonText="Submit"
            onSubmit={handleSubmit}
            triggerText='Add message'
          />
        </div>
      </div>);
  return (
    <div>
        <div className='flex justify-between p-2 text-lg'>

            <h1 className='font-bold'>Discusssions</h1>
            <AddModal
                open={isModalOpen}
                setOpen={setModalOpen}
                title="Add Comment"
                placeholder="Enter your comment"
                buttonText="Submit"
                onSubmit={handleSubmit}
                triggerText='Add Comment'
            />
        </div>
      {result.map((message) => (
        <MessageCard key={message.id} message={message} mutate={mutate}/>
      ))}
    </div>
  )
}

export default DiscussionSection