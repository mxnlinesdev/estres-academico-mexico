"use client"

import * as React from "react"
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/components/ui/toast"

interface ToastData {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive" | "success" | "warning"
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

type Action =
  | { type: "ADD_TOAST"; toast: ToastData }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastData> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

interface State {
  toasts: ToastData[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string, dispatch: React.Dispatch<Action>) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueue(toastId, dispatch)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id, dispatch))
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

// We need to declare dispatch before using it in addToRemoveQueue
let dispatch: React.Dispatch<Action> = () => {}

const addToRemoveQueueFixed = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)
  toastTimeouts.set(toastId, timeout)
}

const reducerFixed = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        addToRemoveQueueFixed(toastId)
      } else {
        state.toasts.forEach((toast) => addToRemoveQueueFixed(toast.id))
      }
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

const ToastContext = React.createContext<{
  toasts: ToastData[]
  dispatch: React.Dispatch<Action>
} | null>(null)

export function Toaster() {
  const context = React.useContext(ToastContext)
  if (!context) return null
  const { toasts, dispatch } = context
  if (!toasts) return null

  return (
    <ToastViewport toasts={toasts} dispatch={dispatch} />
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducerFixed, { toasts: [] })

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, dispatch }}>
      {children}
      <ToastViewport toasts={state.toasts} dispatch={dispatch} />
    </ToastContext.Provider>
  )
}

function ToastViewport({ toasts, dispatch }: { toasts: ToastData[]; dispatch: React.Dispatch<Action> }) {
  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} variant={toast.variant} open={toast.open} onOpenChange={(open) => dispatch({ type: "UPDATE_TOAST", toast: { ...toast, open } })}>
          <div className="grid gap-1">
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
          </div>
          <ToastClose onClick={() => dispatch({ type: "DISMISS_TOAST", toastId: toast.id })} />
        </Toast>
      ))}
    </div>
  )
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type Toast = Omit<ToastData, "id" | "open" | "onOpenChange">

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")

  const { toasts, dispatch } = context

  const toast = ({ ...props }: Toast) => {
    const id = genId()

    const update = (props: ToastData) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    dispatch({
      type: "ADD_TOAST",
      toast: { ...props, id, open: true, onOpenChange: (open: boolean) => { if (!open) dismiss() } },
    })

    return { id, dismiss, update }
  }

  return {
    ...context,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}