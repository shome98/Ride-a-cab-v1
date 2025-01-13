import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import UserSignUp from "./auth/UserSignup"

function App() {

  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-up" element={<UserSignUp/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
