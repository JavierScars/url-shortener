import { createContext, ReactElement, useEffect, useState } from "react";
import { IUser } from "../interfaces/User";
import { getUser } from "../services/auth";

export const UserContext = createContext<{ user: IUser | null, setUser: (user: IUser | null) => void }>({
    user: null,
    setUser: () => { },
})

export function UserContextProvider({ children }: { children: ReactElement }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                const user = await getUser()
                if (user) {
                    return setUser(user)
                }
                setUser(null)
            }
            catch {
                setUser(null)
            }
            finally {
                setLoading(false)
            }
        })()
    }, [])

    return <UserContext.Provider value={{ user, setUser }}>{loading ? null : children}</UserContext.Provider>
}