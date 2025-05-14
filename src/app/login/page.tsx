import Login from '@/ui/Login/Login'

export default function LoginPage() {
  return (
    <div id="loginBackground" className="flex flex-col items-center justify-center bg-[url(/background/fondoLogin.jpg)] bg-cover py-10">
      <Login />
    </div>
  )
}