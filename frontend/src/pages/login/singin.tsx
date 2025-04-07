import { Mail, Lock, LockKeyhole, Phone, User2, ShoppingBag } from "lucide-react";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

interface SingInProps{
    openLogin: () => void
}

export function SingIn({openLogin}: SingInProps){
    const navigate = useNavigate()
    
     async function singInUser(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const name = data.get('name')?.toString()
        const email = data.get('email')?.toString()
        const phone = data.get('number')?.toString()
        const password = data.get('password')?.toString()
        const confirmPassword = data.get('confirmPassword')?.toString()

        if (!name || !email || !phone || !password || !confirmPassword) return console.log(`no receive data`)
        
        if (!(password === confirmPassword)) return console.log(`password and confirm password are differents passwords`)
        
        console.log({name, email, phone, password})

        const response = await api.post('/users', {
            name,
            phone,
            email,
            password
        })

        const { userId } = response.data

        navigate(`/${userId}`)
    }

    return (
        <form onSubmit={singInUser} className="w-full max-w-md p-12 flex flex-col gap-y-4 border-4 border-[--text-bold] rounded-xl bg-[--components] shadow-shape">
            <div className="flex flex-col place-self-center text-center">
                <ShoppingBag className="size-16"/>
                <h2 className="">Easbuy</h2>
            </div>
            <div className="flex flex-col gap-y-2">
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <User2/>
                    <input type="text" name="name" placeholder="name" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none"/>
                </div>
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <Mail/>
                    <input type="email" name="email" placeholder="email" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none"/>
                </div>
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <Phone/>
                    <input type="number" name="number" placeholder="number" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none" />
                </div>
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <Lock/>
                    <input type="password" name="password" placeholder="password" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none" />
                </div>
                <div className="flex bg-[--placeholder] rounded-lg px-4 py-1 space-x-2 hover:outline outline-teal-300">
                    <LockKeyhole/>
                    <input type="password" name="confirmPassword" placeholder="confirm password" className="flex flex-1 bg-transparent placeholder:text-slate-900 outline-none" />
                </div> 
            </div>
            <button type="button" onClick={openLogin}className="text-[--text-bold] hover:underline">
                already have an account ?
            </button>
            <button type="submit" className="bg-[--button] rounded-md py-2 text-lg hover:bg-cyan-500">
                login
            </button>
        </form>
    )
}