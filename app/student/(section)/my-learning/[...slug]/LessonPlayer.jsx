'use client';
import React from 'react';

const LessonPlayer = ({ lesson }) => {
  if (!lesson) return <p>No lesson selected</p>;

  return (
    <div className="space-y-4">
      <p className="text-xl font-bold">{lesson.title}</p>
      <p className="text-gray-600">Section: {lesson.sectionTitle}</p>

      {lesson.video_url ? (
        <div className="aspect-video w-full rounded overflow-hidden">
          <video
            src={lesson.video_url}
            className="w-full h-full"
            controls
            autoPlay
            controlsList="nodownload"
          />
        </div>
      ) : (
        <div className="bg-white border rounded p-4 shadow">
          <p className="text-gray-700">{lesson.content || "No content available for this lesson."}</p>
        </div>
      )}
    </div>
  );
};

export default LessonPlayer;
