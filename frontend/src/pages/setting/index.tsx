import { ArrowBigLeft } from 'lucide-react'
import { useState } from 'react'
import Profile from './profile';
import Purchase from './purchase';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  
    const navigate = useNavigate()
    const [title, setTitle] = useState("Profile")

    return (
        <div className='bg-indigo-900 w-full max-w-screen-lg flex place-self-center justify-around items-center'>
            <ul className='flex flex-col space-x-8 gap-y-5'>
                <button onClick={()=> navigate(-1)}><ArrowBigLeft className='place-self-center'/></button>
                <button onClick={()=> setTitle("Profile")}>Profile</button>
                <button onClick={()=> setTitle("Your purchases")}>Your purchases</button>
                <button>Logout</button>
                <button>Delete account</button>
            </ul>
            <div className='flex flex-1 flex-col gap-y-6 items-center'>
                {title==="Profile"? 
                <Profile />
                : <Purchase /> }
            </div>
        </div>
    )
}

export default Setting