
"use client"

import React, { useEffect, useState } from 'react'
import { chat_service, useAppData, User } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import Loading from '../component/Loading'
import SideBar from '../component/SideBar'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'
import ChatHeader from '../component/ChatHeader'
import ChatMessages from '../component/ChatMessages'
import MessageInput from '../component/MessageInput'
import { SocketData } from '../context/SocketContext'


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
  const {loading,isAuth,logoutUser,chats,user:loggedInUser,users,fetchChats,setChats} = useAppData()

  const {onlineUsers} = SocketData()

  console.log(onlineUsers)
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

  async function fetchChat(){
    const token = Cookies.get("token")

    try {
      const {data} = await axios.get(`${chat_service}/api/v1/message/${selectedUser}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      setMessages(data.messages)
      setUser(data.user)
      await fetchChats()
    } catch (error) {
      console.log(error)
      toast.error("failed to load message")
      
    }
  }

  async function createChat(u:User){

   try {
     const token = Cookies.get("token")
    const {data} = await axios.post(`${chat_service}/api/v1/chat/new`,{
      userId:loggedInUser?._id,
      otherUserId:u._id
    },{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    setSelectedUser(data.chatId)
    setShowAllUser(false)
    await fetchChats()

   } catch (error) {
    toast.error("failed to start chat")
   }

  }


  const handleMessagesend = async(e:any,imageFile?:File | null)=>{
    e.preventDefault()

    if(!message.trim() && !imageFile ) return 

    if(!selectedUser) return
    //socket work

    const token = Cookies.get("token")

    try {
      const formData = new FormData()
      formData.append("chatId", selectedUser)

      if(message.trim()){
        formData.append("text",message)
      }

      if(imageFile){
        formData.append("image",imageFile)
      }

      const {data} = await axios.post(`${chat_service}/api/v1/message`,formData,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type":"multipart/form-data"
        }
      })

      setMessages((prev)=>{
        const currentMessages = prev || []
        const messageExists = currentMessages.some(
          (msg)=>msg._id === data.message._id
        )

        if(!messageExists){
          return [...currentMessages,data.message]
        }
        return currentMessages
      })

      setMessage("")

      const displayText = imageFile ? "image" : message
    } catch (error:any) {
      toast.error(error.response.data.message)
      
    }

  }

  const handleTyping= (value:string)=>{
    setMessage(value )

    if(!selectedUser) return

    //socket setup
  }

  useEffect(()=>{
    if(selectedUser){
      fetchChat()
    }

  },[selectedUser])

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
    createChat={createChat}
/>

{/** chat header */}
<div className='flex-1 p-4 flex justify-between backdrop-blur-xl  border borer-white/10 flex-col bg-white/5 '>

<ChatHeader
    user={user}
    setSidebarOpen={setSidebarOpen}
    isTyping={isTyping}
/>

<ChatMessages  selectedUser={selectedUser}
  messages={messages}
  loggedInUser={loggedInUser}/>

  <MessageInput selectedUser={selectedUser} message={message} setMessage={handleTyping} handleMessageSend={handleMessagesend}/>
</div>
    </div>
    </>
  )
}

export default ChatApp
