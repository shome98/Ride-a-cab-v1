import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSignUp(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [password,setPassword]=useState("");
    const submitHandler=(event:React.FormEvent)=>{
        event.preventDefault();
    }
    return (
    <>
    <div className="p-7 h-screen flex flex-col justify-between ">
    <div>
        <h1>paste a background image here</h1>
        <form action="" method="post" onSubmit={submitHandler}>
        <h3 className="text-lg mb-2 text-center font-medium">What's your name?</h3>
            <div className="flex gap-4 mb-2">
            <input 
            type="text" 
            className="bg-slate-100 rounded px-2 py-2 text-lg border  w-full placeholder:text-m text-center" 
            placeholder="First Name"
            required
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            />
            <input 
            type="text" 
            className="bg-slate-100 rounded px-2 py-2 text-lg border  w-full placeholder:text-m text-center" 
            placeholder="Last Name"
            required
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            />
            </div>
            <h3 className="text-lg mb-2 text-center font-medium">What's your email?</h3>
            <input 
            type="email" 
            className="bg-slate-100 rounded px-2 py-2 text-lg border  w-full placeholder:text-m text-center" 
            placeholder="your.email@example.com"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <h3 className="text-lg mb-2 text-center font-medium">Enter Password</h3>
            <input 
            type="password" 
            className="bg-slate-100 rounded px-2 py-2 text-lg border  w-full placeholder:text-m text-center" 
            placeholder="your secure password" 
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="bg-black text-white m-3 w-full px-4 py-2 rounded font-semibold">Create New Account</button>
        </form>
    </div>
    <div>
    <button className="bg-yellow-400 text-black m-3 w-full px-4 py-2 rounded font-semibold" onClick={()=>navigate("/captain-signup")}>Join as a Captain</button>
    </div>
    </div>
    </>);
}