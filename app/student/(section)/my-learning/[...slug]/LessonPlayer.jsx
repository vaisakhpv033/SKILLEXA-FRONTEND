'use client';
import React from 'react';

const LessonPlayer = ({ lesson }) => {
  if (!lesson) return <p className="text-center text-gray-500">No lesson selected</p>;

  return (
    <div className="flex justify-center items-center w-full rounded-lg overflow-hidden shadow">
      {lesson.video_url ? (
        <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-md">
          <video
            src={lesson.video_url}
            className="absolute top-0 left-0 w-full h-full"
            controls
            autoPlay
            controlsList="nodownload"
          />
        </div>
      ) : (
        <div className="text-gray-700 text-base leading-relaxed">
          {lesson.content || "No content available for this lesson."}
        </div>
      )}
    </div>
  );
};

export default LessonPlayer;
