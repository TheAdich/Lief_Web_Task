'use client'
import { createContext, useState, useEffect } from "react"
import { useSession } from "next-auth/react";


export type AuthContextType={
    authuser?:UserProps
}

type UserProps = {
    name: string,
    email: string,
    image: string
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession();
    const [authuser, setUser] = useState<UserProps>();
    useEffect(()=>{
        if(session.data?.user){
            setUser(session.data?.user ? {
                name: session.data.user.name ?? '',
                email: session.data.user.email ?? '',
                image: session.data.user.image ?? ''
            } : undefined);
        }
    },[session])
    
    return (
        <AuthContext.Provider value={{ authuser }}>
             { children }
        </AuthContext.Provider>
    )
}
