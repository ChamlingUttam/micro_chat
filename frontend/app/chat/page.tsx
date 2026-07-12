
"use client"

import React, { useEffect } from 'react'
import { useAppData } from '../context/AppContext'
import { useRouter } from 'next/navigation'
import Loading from '../component/Loading'

const Chat = () => {
  const {loading,isAuth} = useAppData()
  const router = useRouter()

  useEffect(()=>{

    if(!isAuth && !loading){
      router.push("/login")
    }
  },[isAuth,loading,router])

  if(loading) return <Loading/>
  return (
    <div>
      <p>chat app</p>
    </div>
  )
}

export default Chat
