"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";
import { EmailToast } from "./EmailToast.tsx";

interface Toast {
	id: string;
	preview: string;
}

interface ToastContextType {
	addToast: (toast: Omit<Toast, "id">) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

interface ToastProviderProps {
	children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substring(2, 11);
		setToasts((prev) => [...prev, { ...toast, id }]);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-h-screen overflow-y-auto">
				{toasts.map((toast, index) => (
					<EmailToast
						key={toast.id}
						isVisible={true}
						onClose={() => removeToast(toast.id)}
						preview={toast.preview}
						stackIndex={index}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
}
