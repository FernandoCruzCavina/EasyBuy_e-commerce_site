import { useState } from "react"
import { LogIn } from "./login"
import { SingIn } from "./singin"



export function Login(){
    const [isLogin, setIsLogin] = useState(true)
    
    function openLogin(){
        setIsLogin(true)
    }

    function closeLogin(){
        setIsLogin(false)
    }
    return (
        <>
            <main className={`flex flex-col w-full h-[74vh] bg-[--background] justify-center items-center `}>
                {isLogin? (
                    <LogIn closeLogin={closeLogin}/>
                ):(
                    <SingIn openLogin={openLogin}/>
                )}
            </main>
            <footer className="w-full h-[14vh] absolute bg-[--background] space-y-4">
                <div className="flex justify-center space-x-8">
                    <button className="text-[--text-bold] hover:underline">conditions of use</button>
                    <button className="text-[--text-bold] hover:underline">privacy notice</button>
                    <button className="text-[--text-bold] hover:underline">help</button>
                </div>
                <p className="flex justify-center text-[--text]">
                    ©️2025, EasyBuy.com, Inc. or its affiliates
                </p>
            </footer>
        </>
    )
}