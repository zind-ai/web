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

interface UserContextProps {
  user: User | undefined
  getUser: () => void
  gettingUser: ActionState
  updateUser: (name: string) => void
  updatingUser: ActionState
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId] = useState("027149fd-2c3e-4475-b51a-1eaf36a98ab7")
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
    }))

    callAPI({
      url: `/api/user?user_id=${userId}`,
      method: "get",
      onSuccess: (data: { user: User }) => {
        if (data.user) {
          setUser(data.user)
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

  const updateUser = (name: string) => {
    if (!user || !name) return

    setUpdatingUser((prevState) => ({
      ...prevState,
      loading: true,
    }))

    callAPI({
      url: "/api/user",
      method: "patch",
      formData: {
        name: name,
        user_id: user.id,
      },
      onSuccess: () => {
        setUser((prevState) => {
          if (prevState === undefined) {
            return undefined
          }

          return {
            ...prevState,
            name: name,
          }
        })

        setUpdatingUser((prevState) => ({
          ...prevState,
          loading: false,
          success: true,
        }))

        showToast("User profile updated")
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
