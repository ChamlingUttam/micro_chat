
"use client"

import React, { useEffect, useState } from 'react'
import { useAppData, User } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import Loading from '../component/Loading'
import SideBar from '../component/SideBar'

export interface Message{
  _id:string
  chatId:string
  sender?:string
  text?:string
  image?:{
    url:string
    publicId:string
  }
  messageType:"text" | "image"
  seen:boolean
  seenAt?:string
  createdAt:string
}


const ChatApp = () => {
  const {loading,isAuth,logoutUser,chats,user:loggedInUser,users,fetchChats,setChatsk} = useAppData()

  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[] |null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [showAllUser, setShowAllUser] = useState(false)
  const [isTyping,setIsTyping] = useState(false)
  const [typingTimeout,setTypingTimeOut] = useState<NodeJS.Timeout|null>(null)


  const router = useRouter()

  useEffect(()=>{

    if(!isAuth && !loading){
      router.push("/login")
    }
  },[isAuth,loading,router])

  const handleLogout = ()=>logoutUser()

  if(loading) return <Loading/>
  return (
    <>
    <div className='min-h-screen flex bg-gray-900 text-white  relative overflow-hidden'>
    <SideBar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    showAllUsers={showAllUser}
    setShowAllUsers={setShowAllUser}
    users={users}
    loggedInUser={loggedInUser}
    chats={chats}
    selectedUser={selectedUser}
    setSelectedUser={setSelectedUser}
    handleLogout={handleLogout}
/>
    </div>
    </>
  )
}

export default ChatApp
