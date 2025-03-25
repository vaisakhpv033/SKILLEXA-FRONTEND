import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-pulse text-muted-foreground">
      Loading...
    </div>
  </div>
  )
}

export default Loading