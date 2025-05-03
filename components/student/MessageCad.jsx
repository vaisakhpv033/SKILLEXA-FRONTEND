'use client';

import React, { useState } from 'react';
import { useCurriculum } from '@/lib/client/publicCurriculum';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { addComment } from '@/lib/client/publicCurriculum';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const MessageCard = ({ message, mutate, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (comment) => {
    let data = {
        course: message.course,
        comment: comment,
        parent: message.id
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

  return (
    <div style={{ marginLeft: depth * 20 }} className={cn("mb-4 rounded-lg", showReplies && 'border')}>
      <Card className={showReplies ? 'shadow-sm border-none' : 'shadow-none border-none bg-background'}>
        <CardHeader className="flex flex-row items-center justify-between gap-2  space-x-4">
            <div className='flex items-center gap-1'>
                <Avatar>
                    <AvatarImage src={message.user_profile_picture} alt={message.user_full_name} />
                    <AvatarFallback>{message.user_full_name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center space-x-2">
              
                    <h4 className="font-semibold">{message.user_full_name}</h4>
                    {message.is_instructor && <Badge variant="outline">Instructor</Badge>}
                </div>
            </div>
          <div className="flex">

            <p className="text-sm text-muted-foreground">{format(new Date(message.created_at), 'PPP p')}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p>{message.comment}</p>
        </CardContent>
        {depth === 0 && (
            <CardFooter>
                <Button className="relative" variant="ghost" size="icon" onClick={() => setShowReplies(!showReplies)}>
                    <MessageSquare className="h-4 w-4" />
                    {message.replies && message.replies.length > 0 && (
                              <span className="absolute top-3 right-1 text-xs bg-violet-200 p-1 px-2 rounded-full font-medium text-muted-foreground transform translate-x-1/2 -translate-y-1/2">
                              {message.replies.length}
                            </span>
                    )}
                </Button>
                <AddModal
                    open={isModalOpen}
                    setOpen={setModalOpen}
                    title="Add Reply"
                    placeholder="Enter your reply message"
                    buttonText="Submit"
                    onSubmit={handleSubmit}
                />
            </CardFooter>
        )}
      </Card>
      {showReplies && message.replies && message.replies.length > 0 && (
        <div className="mt-2">
          {message.replies.map((reply) => (
            <MessageCard key={reply.id} message={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageCard;




// Add Lesson Component
export function AddModal({ open, setOpen, title, placeholder, buttonText, onSubmit, triggerText="" }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue); // Call the onSubmit function with the input value
      setInputValue(""); // Clear the input field
      setOpen(false); // Close the modal
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) setInputValue(""); // Reset input when modal is closed
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="px-3 py-2 h-8 text-xs">
          <Plus className="mr-1 h-3 w-3" />{triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Modal"}</DialogTitle>
        </DialogHeader>
        <Input
          placeholder={placeholder || "Enter the title"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} // Update input value on change
        />
        <Button onClick={handleSubmit}>{buttonText || "Submit"}</Button>
      </DialogContent>
    </Dialog>
  );
}
