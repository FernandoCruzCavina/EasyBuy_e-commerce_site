import { createContext, ReactNode, useContext, useState } from "react"
import {jwtDecode} from "jwt-decode";

interface User{
    name: string
    email: string 
    phone: string
    password: string
    profile: Profile
}

interface Profile{
    id: string
    avatar: Blob
    background: Blob
}

interface AuthenticatedContextProps{
    user: User|undefined;
    isAuth: boolean;
    isAuthenticated: ()=> void;
}

const authenticatedContext = createContext<AuthenticatedContextProps | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }){
    const [user, setUser] = useState<User|undefined>()
    const [isAuth, setAuth] = useState(false)

    function isAuthenticated(){        

            const token = localStorage.getItem("token")
            if(token){  
            try {
                const decoded = jwtDecode<User>(token)
                setUser(decoded)
                setAuth(true)
                console.log(user)
            } catch (err) {
            console.error("no token")
            setUser(undefined)
            setAuth(false)
            }}
        
    }

    return (
        <authenticatedContext.Provider value={{user, isAuth,isAuthenticated}}>
            {children}
        </authenticatedContext.Provider> 
    )
}

export function useAuth(){
    const context = useContext(authenticatedContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeModeProvider');
    }

    return context
}
