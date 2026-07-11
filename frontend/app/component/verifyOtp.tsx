
"use client"

import axios from "axios"
import { ArrowRight, ChevronLeft, Loader2, Lock } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import Cookies from "js-cookie"
import { user_service } from "../context/AppContext"

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [timer, setTimer] = useState(60)

  const inputRef = useRef<Array<HTMLInputElement | null>>([])

  const router = useRouter()

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer])

  const email: string = searchParams.get("email") || ""

  const handleInputChange = (index: number, value: string): void => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    if (value && index < 5) {
      inputRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ): void => {
    e.preventDefault()

    const pasteData = e.clipboardData.getData("text")
    const digits = pasteData.replace(/\D/g, "").slice(0, 6)

    if (digits.length === 6) {
      const newOtp = digits.split("")
      setOtp(newOtp)
      inputRef.current[5]?.focus()
    }
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    const otpString = otp.join("")

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits of the OTP.")
      return
    }

    setError("")
    setLoading(true)

    try {
      const { data } = await axios.post(
        `${user_service}/api/v1/verify`,
        {
          email,
          otp: otpString,
        }
      )

      alert(data.message)

      Cookies.set("token", data.token, {
        expires: 15,
        secure: false,
        path: "/",
      })

      setOtp(["", "", "", "", "", ""])
      inputRef.current[0]?.focus()
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setResendLoading(true)
    setError("")

    try {
      const { data } = await axios.post(
        `${user_service}/api/v1/login`,
        {
          email,
        }
      )

      alert(data.message)
      setTimer(60)
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8">
          <div className="text-center mb-8 relative">
            <button
              className="absolute top-0 left-0 p-2 text-gray-300 hover:text-white"
              onClick={() => router.push("/login")}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="mx-auto w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Lock size={40} className="text-white" />
            </div>

            <h1 className="text-white font-bold text-4xl">
              Verify your account
            </h1>

            <p className="text-white text-lg">
              We have sent a 6 digit code
            </p>

            <p className="text-blue-400 font-medium">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-white text-sm mb-4 text-center block">
                Enter your 6 digit OTP
              </label>

              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRef.current[index] = el
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleInputChange(index, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center font-bold border-2 border-gray-600 rounded-lg bg-gray-700 text-white"
                  />
                ))}
              </div>

              {error && (
                <div className="bg-red-900 border border-red-700 rounded-lg p-3 mt-4">
                  <p className="text-red-400 text-sm text-center">
                    {error}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Verify</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Didn't receive the code?
            </p>

            {timer > 0 ? (
              <p className="text-gray-400 text-sm">
                Resend code in {timer} seconds
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-blue-400 hover:text-blue-300 font-medium text-sm disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend code"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp