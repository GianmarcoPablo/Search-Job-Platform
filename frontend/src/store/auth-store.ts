import { create } from "zustand";
import { persist } from "zustand/middleware"

type StatusAuth = "authenticated" | "not-authenticated" | "checking"
type UserRole = "applicant" | "recruiter" | null

type State = {
    token: string,
    profile: {},
    isAuth: StatusAuth,
    role: UserRole
}

type Actions = {
    setToken: (token: string) => void,
    setProfile: (profile: {}) => void,
    setRole: (role: UserRole) => void,
    logout: () => void,
    checking: () => void
}

export const useAuthStore = create(persist<State & Actions>((set) => ({
    token: "",
    profile: {},
    isAuth: "not-authenticated",
    role: null,

    setToken: (token: string) => set(() => ({
        token,
        isAuth: "checking"
    })),

    setProfile: (profile: {}) => set((state) => ({
        profile,
        isAuth: state.token ? "authenticated" : "not-authenticated",
    })),

    setRole: (role: UserRole) => set(() => ({
        role
    })),

    logout: () => set(() => ({
        token: "",
        profile: {},
        isAuth: "not-authenticated",
        role: null
    })),

    checking: () => set(() => ({
        isAuth: "checking"
    }))

}), {
    name: "auth-storage-persist"
}))