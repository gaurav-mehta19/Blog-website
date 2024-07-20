import { SignupInput } from "@gaurav_mehta/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest(){
        try{
          const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
          console.log(response);
          
            const jwt = response.data.jwt
            console.log(jwt);
            
            localStorage.setItem("token",jwt);
            navigate('/blogs')
        } catch(e){
            console.log(e);
            
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl text-center font-extrabold px-20 mb-3">
                   {type === "signin" ? "Sign In" : "Create an account" } 
                </div>
                <div className="text-slate-400 px-20 mb-8">
                    {type==="signin" ? "Don't have an account? " : "Already have an account? "}
                    <Link className="pl-1 underline" to={type ==="signin" ? "/signup" : "/signin"}>{type==="signin" ? "Sign up" : "Sign in"}</Link>
                </div>
                {type ==="signup" ?<LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                    setPostInputs(c=>({...c,name:e.target.value}))
                }}></LabelledInput> :null}
                 <LabelledInput label="Email" placeholder="xyz@gmail.com" onChange={(e)=>{
                    setPostInputs(c=>({...c,email:e.target.value}))
                }}></LabelledInput>
                 <LabelledInput type="password" label="Password" placeholder="Minimum 8 character" onChange={(e)=>{
                    setPostInputs(c=>({...c,password:e.target.value}))
                }}></LabelledInput>
                <button onClick={sendRequest} className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white">{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
        </div>
    </div>
}


interface LabelledInputtype{
    label:string,
    placeholder:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string
}

function LabelledInput({label,type,placeholder,onChange}:LabelledInputtype){
    return  <div>
    <label className="block mb-2 text-md font-semibold text-gray-900">{label}</label>
    <input type={type || "text" } id="first_name" className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} onChange={onChange} required />
</div>
}