import React from 'react'

const ErrorComponent = ({error}) => {
  return (
    <div className="flex items-center justify-center p-4 text-red-500 rounded-lg">
        Error: {error.message ? error.message : error }
    </div>
  )
}

export default ErrorComponent