import { Lock, Mail, ShoppingBag} from "lucide-react";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authenticated";

interface LogInProps{
    closeLogin: () => void
}

export function LogIn({closeLogin}: LogInProps){

    const navigate = useNavigate()

    const {isAuthenticated} = useAuth()

    async function loginUser(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('emailUser')?.toString()
        const password = data.get('passwordUser')?.toString()

        console.log({email, password})

        const response = await api.post('/users/login', {
            email,
            password
        })

        const token: string = response.data

        localStorage.removeItem("token")
        console.log(token)

        localStorage.setItem("token", JSON.stringify(token))

        isAuthenticated()

        navigate("/")
    }

    return (
        <form onSubmit={loginUser} className="w-full max-w-md p-12 flex flex-col gap-y-4 border-4 border-[--text-bold] rounded-xl bg-[--components] shadow-shape">
            <div className="flex flex-col place-self-center text-center">
                        <ShoppingBag className="size-16"/>
                        <h2 className="">Easybuy</h2>
                    </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <Mail/>
                    <input type="email" name="emailUser" placeholder="email" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none"/>
                </div>
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <Lock/>
                    <input type="password" name="passwordUser" placeholder="password" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none" />
                </div>
            </div>
            <div className="flex justify-between">
                <button type="button" className="text-[--text-bold] hover:underline ">forgot password ?</button>
                <button type="button" onClick={closeLogin} className="text-[--text-bold] hover:underline">not have an account ?</button>
            </div>
            <button type="submit" className="bg-[--button] rounded-md py-2 text-lg hover:bg-cyan-500">
                login
            </button>
            <div className="flex flex-col">
                <p className="flex self-center text-gray-100/90 pb-1">New to EasyBuy?</p>
                <button type="button"  className="text-[--text-bold] hover:underline">create your business account</button>    
            </div>
            
        </form>
    )
}