import { useEffect } from "react"
import { useAuth } from "../../context/authenticated"

export function Home(){

    const { user, isAuth } = useAuth()

    useEffect(() => {
        console.log(user)
    }, [isAuth])
    
    return (
        <div className="h-[88vh] w-full bg-[--background]">
            <div>
                {user? 
                    <p>Hello, {user.name}</p>:
                    <p>Hello, Visitor</p>
                }
            </div>
        </div>
    )
}