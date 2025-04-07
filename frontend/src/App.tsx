import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/home"
import { NavBar } from "./components/navBar"
import { Login } from "./pages/login"
import { ThemeModeProvider } from "./context/dark-mode"
import { AuthProvider } from "./context/authenticated"
import Setting from "./pages/setting"

export function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
      <ThemeModeProvider>
        <NavBar/>
        <Routes>
            <Route path="/setting" element={<Setting />} />
            <Route path="/"  element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </ThemeModeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


