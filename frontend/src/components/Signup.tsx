import { SignupInput } from "@gaurav_mehta/medium-common/dist/zod/zod"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { popupcardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popupCard";
import { useRecoilState } from "recoil"


export const Signup = () => {
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:"",
        description:""
    })

    const [showPopupCard,setShowPopupCard] = useRecoilState(popupcardAtom)

    async function handleSubmit(){
        try{
             await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs,{withCredentials:true})
              navigate('/blogs')
          } catch(e){
              console.log(e);
              
          }
    }


    return <div className={`h-screen flex justify-center flex-col`}>
        <div className={`flex justify-center  ${showPopupCard ? 'blur-sm' : ''}`}>
            <div>
                <div className="text-3xl text-center font-extrabold px-20 mb-3">
                   Create an account
                </div>
                <div className="text-slate-400 px-20 mb-8">
                    Already have an account? 
                    <Link className="pl-1 hover:underline" to={"/signin"}>Sign in</Link>
                </div>
                 <LabelledInput label="Email" placeholder="xyz@gmail.com" onChange={(e)=>{
                    setPostInputs(c=>({...c,email:e.target.value}))
                }}></LabelledInput>
                 <LabelledInput type="password" label="Password" placeholder="Minimum 8 character" onChange={(e)=>{
                    setPostInputs(c=>({...c,password:e.target.value}))
                }}></LabelledInput>
                <button onClick={()=>{setShowPopupCard(prev=>!prev)}} className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white">Sign Up</button>
            </div>
        </div>

        {showPopupCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between">
            <div className="text-xl font-bold mb-4">Complete Your Profile</div>
            <svg onClick={()=>{setShowPopupCard(prev=>!prev)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 hover:rounded-full hover:bg-slate-100">
             <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
             </svg>
            </div>
            <LabelledInput
              label="Name"
              placeholder="John Doe"
              onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))}
            />
            <LabelledInput
              label="Description"
              placeholder="Brief description about you"
              onChange={(e) => setPostInputs((c) => ({ ...c, description: e.target.value }))}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full text-lg h-12 rounded-lg bg-blue-500 text-white"
            >
              Submit
            </button>
          </div>
        </div>
      )}
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


// try{
//     const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs)
//     console.log(response);
    
//       const jwt = response.data.jwt
//       console.log(jwt);
      
//       localStorage.setItem("token",jwt);
//       navigate('/blogs')
//   } catch(e){
//       console.log(e);
      
//   }