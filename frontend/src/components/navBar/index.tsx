import {ShoppingBagIcon, Search, ShoppingCart, Sun, Moon} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/dark-mode'
import { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/context/authenticated'

export function NavBar(){
    const navigate = useNavigate()
    const { theme, turnTheme } = useTheme()
    const {user, isAuth} = useAuth()

    useEffect(() => {
    }, [isAuth])

    const profileDefault = theme === "dark"? 
    "https://cdn-icons-png.flaticon.com/512/7915/7915522.png"
    : "https://cdn-icons-png.flaticon.com/512/17780/17780123.png "

//https://img.vsco.co/cdn-cgi/image/width=480,height=640/e30640/193236451/679599b1f9af8a0e18c88ad1/vsco_012525.jpg



    return (
        <nav className={`w-screen h-[12vh] bg-[--nav] flex flex-col px-[20%] space-y-3 justify-center text-[--text]`}>
            <div className="flex justify-between">
                <ShoppingBagIcon className=' size-7'/>
                <ul className='flex space-x-6'>
                    <li>Category</li>
                    <li>Product</li>
                    <li>History</li>
                    <li>Company</li>
                </ul>
                <Search className='size-7 transition-all hover:animate-spin '/>
            </div>
            <div className='flex justify-between place-items-center'>
                <Link to={'/'}>
                    EasyBuy
                </Link>
                <div className='flex space-x-4 place-items-center'>
                    <Link to={'/login'}>login</Link>
                    <button onClick={turnTheme}>
                        {'dark' === theme? (
                            <Sun/>
                        ):(
                            <Moon/>
                        )}
                    </button>
                    <button onClick={()=> navigate('/setting')} >
                        <Avatar>
                            <AvatarImage src={
                                user?.profile?.avatar
                                ? typeof user.profile.avatar === "string"
                                    ? user.profile.avatar // se já for uma URL
                                    : URL.createObjectURL(user.profile.avatar) // se for um blob
                                : profileDefault
                            }/>
                            <AvatarFallback>avatar</AvatarFallback>
                        </Avatar>
                    </button>
                    
                    <ShoppingCart/>
                </div>
            </div>
        </nav>
        
    )
}