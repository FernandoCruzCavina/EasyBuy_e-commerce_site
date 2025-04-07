import { createContext, ReactNode, useContext, useState } from "react"

interface ThemeContextProps{
    theme: string;
    turnTheme: () => void;
}

const themeContext = createContext<ThemeContextProps | undefined>(undefined)

export function ThemeModeProvider({ children }: { children: ReactNode }){
    const [theme, setTheme] = useState("light")

    function turnTheme(){
        setTheme(() => "dark" === theme?"light":"dark")
        document.querySelector("body")?.setAttribute("data-theme", theme)
        localStorage.setItem("selectTheme", theme)
    }
    return (
        <themeContext.Provider value={{theme, turnTheme}}>
            {children}
        </themeContext.Provider> 
    )
}

export function useTheme(){
    const context = useContext(themeContext)

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeModeProvider');
    }

    return context
}
