import React from 'react'
import SpotlightCard from '@/components/react-bits/SpotLightCard'
import UserProfile from '@/components/instructor/InstrProfile'

const InstructorSettings = () => {
  return (
    <SpotlightCard className='custom-spotlight-card' spotlightColor='rgba(0, 229, 255, 0.2)'>
      <div>
        <UserProfile />
      </div>
    </SpotlightCard>
  )
}

export default InstructorSettings