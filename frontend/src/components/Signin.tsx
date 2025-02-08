import { SigninInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { showPasswordAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/showPassword";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { BookOpen,Lock } from 'lucide-react';
import { toast } from "sonner";
import { LucideIcon, Mail } from "lucide-react";




export const Signin = () => {
  const navigate = useNavigate();
  const showPassword = useRecoilValue(showPasswordAtom);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    if (postInputs.email.trim().length < 1 || postInputs.password.trim().length < 1) {
      toast.warning("Please fill all fields");
      return;
    }
    if(postInputs.password.trim().length < 8){
      toast.warning("Password length must be 8")
      return;
    }

    const loadingToastId = toast.loading("Signing in...");

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInputs,
        {
          withCredentials: true,
        }
      );
      toast.dismiss(loadingToastId);
      toast.success("Signed in successfully");
      navigate("/blogs");
    }
    catch (e: any) {
      toast.dismiss(loadingToastId);
      if (e.response.data.error) {
        toast.warning(e.response.data.error);
      } else {
        console.error("An error occurred:", e);
        toast.error("An error occurred. Please try again later");
      }
    }
  }


  return (
    <div style={{ userSelect: 'none' }} className="h-[600px] w-[500px] space-y-8 bg-white p-8 rounded-2xl shadow-xl">
      <div className="text-center flex flex-col items-center justify-center">
        <div className="mb-6">
          <BookOpen className="h-12 w-12 text-black text-center" />
        </div>
        <div>
          <div className="text-3xl text-center font-bold mb-2">
            Welcome back
          </div>
          <p className="text-gray-600">Sign in to access your account</p>
          <LabelledInput
            id="signinEmail"
            label="Email"
            placeholder="xyz@gmail.com"
            Icon={Mail}
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, email: e.target.value }));
            }}
          ></LabelledInput>
          <LabelledInputPassword
            id="signinPassword"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Minimum 8 characters"
            Icon={Lock}
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, password: e.target.value }));
            }}
          ></LabelledInputPassword>

           <div className="text-right">
          <a href="#" className="text-sm font-medium text-yellow-600 hover:text-yellow-500">
            Forgot password?
          </a>
        </div>
          <button
            onClick={sendRequest}
            className="mt-4 w-full text-lg h-12 rounded-md bg-black text-white hover:bg-gray-900"
            style={{ userSelect: 'none' }}
          >
            Sign In
          </button>
          <div className="text-gray-600 text-lg mt-6 mb-8">
            Don't have an account?
            <Link className="pl-1 text-yellow-600 hover:underline hover:text-yellow-500" to={"/signup"}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputtype {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  id?: string;
  Icon: LucideIcon;
}

export function LabelledInput({
  label,
  placeholder,
  id,
  onChange,
  Icon,
}: LabelledInputtype) {
  return (
    <div className="mt-6">
      <label htmlFor={id} className="block mb-1 text-start text-md font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type="text"
          id={id}
          className="mb-4 border border-gray-300 text-gray-900 text-md rounded-md focus:border-gray-500 block w-[400px] px-10 py-2.5  outline-none"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export function LabelledInputPassword({
  label,
  type,
  placeholder,
  id,
  onChange,
  Icon
}: LabelledInputtype) {
  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);
  const inputType = type === "password" && showPassword ? "text" : type;
  return (
    <div>
      <label htmlFor={id} className="block mb-1 text-start text-md font-medium text-gray-900">
        {label}
      </label>
      <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        <input
          type={inputType}
          id={id}
          className="mb-4 border border-gray-300 text-gray-900 text-md rounded-md focus:border-gray-500 block w-full py-2.5 px-10 outline-none"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
        <div className="absolute inset-y-2 flex items-center right-0 mr-2" onClick={() => setShowPassword(prev => !prev)}>
          <Eyecomponent />
        </div>
      </div>
    </div>
  );
}


const Eyecomponent = () => {
  const showPassword = useRecoilValue(showPasswordAtom);
  return (
    <div>
      {!showPassword ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      }
    </div>
  )
}

