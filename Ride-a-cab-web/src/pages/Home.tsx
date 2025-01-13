import { useNavigate } from "react-router-dom";

export default function Home():JSX.Element{
    const navigate=useNavigate();
  return (
  <div>
      <div className="h-screen w-full flex justify-between flex-col bg-slate-500">
        <div>image goes here</div>
        <div>backgrund image with vehicles goes here</div>
        <div className="bg-slate-400 flex justify-center flex-col items-center">
        <h2 className="text-[30px] font-seibold">Get started with Ridee</h2>
        <button className="p-3 bg-black text-white rounded-lg m-5" onClick={()=>navigate("/sign-up")}>Continue</button>
        </div>
      </div>
  </div>
  );
}