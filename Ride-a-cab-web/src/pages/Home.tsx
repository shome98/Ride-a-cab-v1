import { useNavigate } from "react-router-dom";

export default function Home():JSX.Element{
    const navigate=useNavigate();
  return (
  <div>
      <div className="h-screen w-full flex justify-between flex-col bg-slate-500">
        <h2 className="text-[30px] font-seibold">Get started with Ridee</h2>
        <button className="p-3 bg-black text-white rounded-lg m-5" onClick={()=>navigate("/sign-up")}>Continue</button>
      </div>
  </div>
  );
}