import { Menu, UserCircle } from 'lucide-react'
import React from 'react'
import { User } from '../context/AppContext'


interface chatHeaderProps{
    user: User |null
    setSidebarOpen :(open:boolean) => void
    isTyping:boolean
}

const ChatHeader = ({user,setSidebarOpen,isTyping}:chatHeaderProps) => {
  return (
    <>
      {/** menu toggle */}
      <div className='sm:hidden fixed top-4 right-4 z-30'>
        <button onClick={()=>setSidebarOpen(true)} className='bg-gray-800 rounded-lg hover:bg-gray-700 p-3 transaction-colors'>
            <Menu className='text-gray-200 h-5 w-5 '/>
        </button>
      </div>

      {/** chat header */}

      <div className="mb-6 bg-gray-800 rounded-lg border-gray-700 p-6">
        <div className='flex items-center gap-4'>
          {user?(
            <>
              <div className='relative'>
                <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'>
                  <UserCircle className='w-8 h-8 text-gray-300'/>
                </div>
                {/** online user setup */}
              </div>

              {/** usr info */}

              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-3 mb-1'>
                  <h2 className='text-2xl font-bold text-white truncate'></h2>
                  {user.name}
                </div>
              </div>

              {/** to show typing status */}
            </>
          ) : ( 
            <div className='flex items-center gap-4'>
              <div className='w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center'> 
                <UserCircle className='w-8 h-8 text-gray-300'/>
              </div>
                 <div className=''>
                  <h2 className='text-2xl font-bold text-gray-400'>
                    select a conversation
                  </h2>
                  <p className='text-sm text-gray-500 mt-1'>choose a chat to start chating</p>

                 </div>
            </div>
          )}

        </div>

      </div>
    </>
  )
}

export default ChatHeader
