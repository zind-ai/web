"use client"

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import {
  useUser as useAuth0User,
  UserProvider as Auth0UserProvider,
} from "@auth0/nextjs-auth0/client"
import { useToast } from "@zind/ui"
import { callAPI } from "@zind/utils"

type ActionState = { loading: boolean; success: boolean }

interface User {
  id?: string | null
  name?: string | null
  email?: string | null
  photo?: string | null
}

interface UserContextProps {
  user: User | undefined

  login: () => void
  logout: () => void

  updateUser: (name: string) => void
  updatingUser: ActionState
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Auth0UserProvider>
      <AuthProvider>{children}</AuthProvider>
    </Auth0UserProvider>
  )
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user: auth0User } = useAuth0User()

  const [user, setUser] = useState<User | undefined>(undefined)
  const [updatingUser, setUpdatingUser] = useState({
    loading: false,
    success: false,
  })

  const { showToast } = useToast()

  useEffect(() => {
    if (auth0User) {
      setUser({
        id: auth0User.sub,
        name: auth0User.name,
        email: auth0User.email,
        photo: auth0User.picture,
      })
    } else {
      setUser(undefined)
    }
  }, [auth0User])

  const login = () => {
    window.location.href = "/api/auth/login"
  }

  const logout = () => {
    window.location.href = "/api/auth/logout"
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
        login,
        logout,
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
