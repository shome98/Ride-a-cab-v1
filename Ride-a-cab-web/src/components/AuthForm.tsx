import React from "react";

interface IAuthFormData{
    [key:string]:string;
}
interface IAuthFormProps{
    onSubmit:(data:IAuthFormData)=>Promise<void>;
    formFields:{
        name:string;
        label:string;
        type?:string;
    }[];
    submitButtonText?:string;
    error?:string;
}
const AuthForm:React.FC<IAuthFormProps>=({ onSubmit, formFields, submitButtonText = "Submit", error })=>{
return (<></>);
}
export default AuthForm;