import React, { useState } from "react";

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
    const[formData,setFormData]=useState<IAuthFormData>({});
    const[loading,setLoading]=useState(false);
    

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error("Error submitting the form: ",error);
        }
        finally{
            setLoading(false);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setFormData({...formData,[event.target.name]:event.target.value})
    }

    return (
    <form onSubmit={handleSubmit}>
        {error && <div className="bg-red p-2">{error}</div>}
        {formFields.map((field)=>(
            <div key={field.name}>
                <label htmlFor={field.name}>{field.name}</label>
                <input
                    type={field.type||"text"}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]||""}
                    onChange={handleChange}
                    placeholder={`Please write your ${field.name} here`}
                />
            </div>
        ))}
        <button type="submit" disabled={loading}>{loading?"Loading...":submitButtonText}</button>
    </form>
    );
};
export default AuthForm;