import { createContext, ReactNode, useState } from "react";

export const FirebaseContext = createContext(null)

export const AuthContext = createContext(null)

export const Context = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<{
        username:string,
        email:string,
        phone:number
    } | null>(null)

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}