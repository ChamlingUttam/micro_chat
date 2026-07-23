import { Divide, Menu, UserCircle } from 'lucide-react'
import React from 'react'
import { User } from '../context/AppContext'


interface chatHeaderProps{
    user: User |null
    setSidebarOpen :(open:boolean) => void
    isTyping:boolean
    onlineUsers:string[]
}

const ChatHeader = ({user,setSidebarOpen,isTyping,onlineUsers}:chatHeaderProps) => {
  const isOnlineUser= user && onlineUsers.includes(user._id)
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
                {
                  isOnlineUser && (
                    <span className='absolute -bottom-1 -right-1 w-5 h-5  rounded-full bg-green-500 border-2 border-gray-800'>
                      <span className='absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75'></span>
                    </span>
                  )
                }
              </div>

              {/** usr info */}

              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-3 mb-1'>
                  <h2 className='text-2xl font-bold text-white truncate'></h2>
                  {user.name}
                </div>
              {/** to show typing status */}
              <div className='flex items-center gap-2 '>


                {
                  isTyping ? (
                  <div className='flex items-center gap-2 text-sm'>
                    <div className='flex gap-1'>
                        <div className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce'></div>
                        <div className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce ' style={{animationDelay:"0.1s"}}></div>
                        <div className='w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce' style={{animationDelay:"0.2s"}}></div>
                    </div>
                    <span className='text-blue-500 font-medium'>typing...</span>
                  </div>
                  ) : (
                    <div className='flex items-center gap-2 '>
                      <div className={`bg-green-500 rounded-full ${isOnlineUser ? "bg-green-500" : "bg-gray-500"}`}></div>
                      <span className={`text-sm font-medium ${isOnlineUser ? "text-green-500" : "text-gray-500"}` }>{
                        isOnlineUser ? "Online" : "Offline"
                        } </span>
                    </div>
                  )}
              </div>

              </div>

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
                  <p className='text-sm text-gray-500 mt-1'>choose a chat to start chatting</p>

                 </div>
            </div>
          )}

        </div>

      </div>
    </>
  )
}

export default ChatHeader
