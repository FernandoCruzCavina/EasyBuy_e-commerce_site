import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"


const Profile = () => {
  return (
    <>
      <p className="text-xl">Profile</p>
      <div className="flex flex-col gap-y-2">
        <Label>Name</Label>
        <Input placeholder="name" variant={"menu"}/>
        <Label className="text-violet-100/80">This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.</Label>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label>Password</Label>
        <Input placeholder="password" variant={"menu"}/>
        <Label className="text-violet-100/80">This is your login password. Make sure it's strong and secure. You can change it at any time for security.</Label>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label>Confirm</Label>
        <Input placeholder="confirm password" variant={"menu"}/>
        <Label className="text-violet-100/80">Re-enter your password to confirm. This must exactly match the password above.</Label>
      </div>
      <div className="flex flex-col gap-y-2">
        <Label>Number</Label>
        <Input placeholder="number" variant={"menu"}/>
        <Label className="text-violet-100/80">Enter your contact number. It helps us verify your identity and keep your account secure.</Label>
      </div>
    </>
  )
}

export default Profile