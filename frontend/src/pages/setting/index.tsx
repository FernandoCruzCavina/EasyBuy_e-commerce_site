import { ArrowBigLeft } from 'lucide-react'
import { useState } from 'react'
import Profile from './profile';
import Purchase from './purchase';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  
    const navigate = useNavigate()
    const [title, setTitle] = useState("Profile")

    return (
        <div className='bg-[--background]'>
            <div className='bg-[--background-menu] w-full h-[88vh] max-w-screen-lg flex place-self-center justify-around'>
                <div className='flex flex-col px-14 py-10 justify-between'>
                    <ul className='flex flex-col gap-y-5'>
                        <button onClick={()=> navigate(-1)}><ArrowBigLeft className='place-self-center'/></button>
                        <button onClick={()=> setTitle("Profile")}>Profile</button>
                        <button onClick={()=> setTitle("Your purchases")}>Your purchases</button>
                        <button>Appearance</button>
                    </ul>
                    <ul className='flex flex-col gap-y-5'>
                        <button>Logout</button>
                        <button>Delete account</button>
                    </ul>
                </div>
                <div className='flex flex-1 flex-col gap-y-6 px-10 py-10'>
                    {title==="Profile"? 
                    <Profile />
                    : <Purchase /> }
                </div>
            </div>
        </div>
    )
}

export default Setting