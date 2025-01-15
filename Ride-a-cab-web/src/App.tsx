import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserSignUp from "./auth/UserSignup"
import UserLogin from "./auth/UserLogin"
import CaptainLogin from "./auth/CaptainLogin"
import CaptainSignUp from "./auth/CaptainSignup"

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<UserSignUp/>}/>
        <Route path="/user-login" element={<UserLogin/>}/>
        <Route path="/captain-login" element={<CaptainLogin/>}/>
        <Route path="/captain-signup" element={<CaptainSignUp/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
