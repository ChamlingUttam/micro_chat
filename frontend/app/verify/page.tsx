import React, { Suspense } from 'react'
import VerifyOtp from '../component/verifyOtp'
import Loading from '../component/Loading'

const VerifyPage = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <VerifyOtp/>
    </Suspense>
    
  )
}

export default VerifyPage
