import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserSignUp from "./auth/UserSignup"
import UserLogin from "./auth/UserLogin"

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<UserSignUp/>}/>
        <Route path="/user-login" element={<UserLogin/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
