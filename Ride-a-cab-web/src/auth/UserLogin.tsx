import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const submitHandler=(event:React.FormEvent)=>{
        event.preventDefault();
    }
    return (
    <>
    <div className="p-7 h-screen w-screen flex flex-col justify-between ">
    <div>
        <h1>paste a background image here</h1>
        <form action="" method="post" onSubmit={submitHandler}>
            <h3 className="text-lg mb-2 text-center font-medium">What's your email??</h3>
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
            <button className="bg-black text-white m-3 w-full px-4 py-2 rounded font-semibold">Login</button>
        </form>
        <p className="text-center m-2">New here? <button className="text-blue-700" onClick={()=>navigate("/sign-up")}>Create new Account</button></p>
    </div>
    <div>
    <button className="bg-yellow-400 text-black m-3 w-full px-4 py-2 rounded font-semibold" onClick={()=>navigate("/captain-login")}>Login as Captain</button>
    </div>
    </div>
    </>);

}