import { create } from "zustand";
import { persist } from "zustand/middleware"

type StatusAuth = "authenticated" | "not-authenticated" | "checking"
type UserRole = "applicant" | "recruiter" | null

interface Profile {
    id: number,
    lastName: string,
    firstName: string,
    role: string,
    applicant?: any,
    recruiter?: any,
    email: string,
}


type State = {
    token: string,
    profile: Profile,
    isAuth: StatusAuth,
    role: UserRole
}

type Actions = {
    setToken: (token: string) => void,
    setProfile: (profile: Profile) => void,
    setRole: (role: UserRole) => void,
    logout: () => void,
    checking: () => void
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
    token: "",
    profile: {} as Profile,
    isAuth: "not-authenticated",
    role: null,

    setToken: (token: string) => set(() => ({
        token,
        isAuth: "checking"
    })),

    setProfile: (profile: Profile) => set((state) => ({
        profile,
        isAuth: state.token ? "authenticated" : "not-authenticated",
    })),

    setRole: (role: UserRole) => set(() => ({
        role
    })),

    logout: () => set(() => ({
        token: "",
        profile: {} as Profile,
        isAuth: "not-authenticated",
        role: null
    })),

    checking: () => set(() => ({
        isAuth: "checking"
    }))

}), {
    name: "auth-storage-persist"
}))