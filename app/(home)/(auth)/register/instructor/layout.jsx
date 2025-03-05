import React from 'react'
import { UserPlus } from 'lucide-react'

const layout = ({children}) => {
    return (
        <main>
            <div className="flex items-center justify-center p-4">
                <div className="w-full max-w-5xl">
                    <div className="bg-white dark:bg-[#0f0d23] rounded-2xl shadow-xl overflow-hidden">
                        <div className="relative h-36 skillexa-gradient p-8">
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white dark:bg-dark-card rounded-full p-4 shadow-lg">
                                <UserPlus className="w-8 h-8 text-custom-gradient-start dark:text-custom-gradient-end" />
                            </div>
                            <h1 className="text-white text-3xl font-bold text-center">Become an Instructor</h1>
                            <p className="text-blue-200 text-center mt-2">Students From all over The World</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default layout