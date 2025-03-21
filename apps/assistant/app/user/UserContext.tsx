"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { useToast } from "@zind/ui"
import { callAPI } from "@zind/utils"
import { User } from "../api/user/types"

type ActionState = { loading: boolean; success: boolean }
type UpdateUser = Partial<Pick<User, "name">>

interface UserContextProps {
  user: User | undefined
  getUser: () => void
  gettingUser: ActionState
  updateUser: (user: UpdateUser) => void
  updatingUser: ActionState
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const userId = "027149fd-2c3e-4475-b51a-1eaf36a98ab7"
  const [user, setUser] = useState<User | undefined>(undefined)

  const [gettingUser, setGettingUser] = useState({
    loading: false,
    success: false,
  })
  const [updatingUser, setUpdatingUser] = useState({
    loading: false,
    success: false,
  })

  const { showToast } = useToast()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    if (!userId) return

    setGettingUser((prevState) => ({
      ...prevState,
      loading: true,
      success: false,
    }))

    callAPI({
      url: `/api/user?id=${userId}`,
      method: "get",
      onSuccess: (data: { user: User }) => {
        if (data.user) {
          setUser(data.user)
          setGettingUser((prevState) => ({
            ...prevState,
            success: true,
          }))
        } else {
          showToast("User not found")
        }

        setGettingUser((prevState) => ({
          ...prevState,
          loading: false,
        }))
      },
      onError: (error) => {
        setGettingUser((prevState) => ({
          ...prevState,
          loading: false,
        }))
        showToast(error.message)
      },
    })
  }

  const updateUser = (u: UpdateUser) => {
    if (!user || !u) return

    setUpdatingUser((prevState) => ({
      ...prevState,
      loading: true,
      success: false,
    }))

    const formData: Record<string, string> = { id: user.id }
    if (u.name !== undefined) formData.name = u.name

    callAPI({
      url: "/api/user",
      method: "patch",
      formData: formData,
      onSuccess: () => {
        setUser((prevState) => {
          if (prevState === undefined) {
            return undefined
          }

          return {
            ...prevState,
            ...u,
          }
        })

        setUpdatingUser((prevState) => ({
          ...prevState,
          loading: false,
          success: true,
        }))
      },
      onError: (error) => {
        setUpdatingUser((prevState) => ({
          ...prevState,
          loading: false,
        }))
        showToast(error.message)
      },
    })
  }

  return (
    <UserContext
      value={{
        user,
        getUser,
        gettingUser,
        updateUser,
        updatingUser,
      }}
    >
      {children}
    </UserContext>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within UserProvider")
  }
  return context
}
