"use client"

import {useEffect, useState} from "react"

interface EmailToastProps {
    isVisible: boolean
    onClose: () => void
    sender: string
    subject: string
    preview: string
    stackIndex?: number
}

export function EmailToast({
                               isVisible,
                               onClose,
                               sender,
                               subject,
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
            className={
                `w-96 bg-black border border-border rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out ` +
                (isAnimating ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95')
            }
            style={{
                animationDelay: `${stackIndex * 100}ms`,
            }}
        >
            <div className={`bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between`}>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs font-medium text-muted-foreground">Nouveau message</span>
                </div>
                <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            {/* Contenu email */}
            <div className="p-4 space-y-3">
                {/* Expéditeur */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span
                            className="text-xs font-semibold text-primary-foreground">{sender.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{sender}</p>
                    </div>
                </div>

                {/* Sujet */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-1">{subject}</h3>
                </div>

                {/* Aperçu */}
                <div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                    <button
                        className="flex-1 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                        Lire
                    </button>
                    <button
                        className="px-3 py-1.5 text-xs border border-border rounded hover:bg-muted transition-colors">
                        Archiver
                    </button>
                </div>
            </div>

            {/* Barre de progression pour l'auto-close */}
            <div className="h-1 bg-muted">
                <div
                    className="h-full bg-primary transition-all duration-5000 ease-linear"
                    style={{
                        width: isAnimating ? "0%" : "100%",
                        transitionDuration: isAnimating ? "5000ms" : "0ms",
                    }}
                />
            </div>
        </div>
    )
}
