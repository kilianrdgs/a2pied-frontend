"use client"

import {useEffect, useState} from "react"

interface EmailToastProps {
    isVisible: boolean
    onClose: () => void
    preview: string
    stackIndex?: number
}

export const EMAIL_TEMPLATE = {title: "MAUVAISE NOUVELLE"}

export function EmailToast({
                               isVisible,
                               onClose,

                               preview,
                               stackIndex = 0,
                           }: EmailToastProps) {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true)
        }
    }, [isVisible])

    const handleClose = () => {
        setIsAnimating(false)
        setTimeout(() => {
            onClose()
        }, 300)
    }

    if (!isVisible) return null

    return (

        <div
            style={{
                transitionDelay: `${stackIndex * 150}ms`,
            }}
            className={
                `w-96 transition-all duration-300 ease-out ` +
                (isAnimating ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95')
            }

        >
            <div className="bg-black border-2 border-red-600 rounded-lg p-4 max-w-sm shadow-2xl relative">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div
                            className="w-fit h-fit bg-gradient-to-br from-rose-500 via-pink-300 to-red-800 rounded-lg p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M8 22L5 8l3-6h8l3 6l-3 14zm3-16v2H9v2h2v5h2v-5h2V8h-2V6z"></path>
                            </svg>
                        </div>
                        <div className="border-b border-red-600/30 pb-2">
                            <h4 className="text-white font-medium text-sm leading-tight">{EMAIL_TEMPLATE.title}</h4>
                        </div>
                        <button onClick={handleClose}
                                className="text-red-500 hover:text-red-400 hover:cursor-pointer transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 30 30">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-300 text-xs leading-relaxed">{preview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
