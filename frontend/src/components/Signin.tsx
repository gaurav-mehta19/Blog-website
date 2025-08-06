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
    <div style={{ userSelect: 'none' }} className="w-full max-w-6xl mx-auto bg-bg-primary px-24 py-12 rounded-3xl shadow-theme-xl border border-border-primary animate-fadeInUp backdrop-blur-sm">
      <div className="text-center mb-8">
        <div className="mb-6 relative">
          <div className="w-16 h-16 bg-theme-primary rounded-full flex items-center justify-center mx-auto shadow-theme-lg animate-float">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold mb-2 text-text-primary animate-fadeInDown">
            Welcome back
          </div>
          <p className="text-text-secondary animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Sign in to continue your journey
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="animate-fadeInUp px-8" style={{ animationDelay: '0.2s' }}>
          <LabelledInput
            id="signinEmail"
            label="Email"
            placeholder="Enter your email address"
            Icon={Mail}
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, email: e.target.value }));
            }}
          />
        </div>

        <div className="animate-fadeInUp px-8" style={{ animationDelay: '0.3s' }}>
          <LabelledInputPassword
            id="signinPassword"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            Icon={Lock}
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, password: e.target.value }));
            }}
          />
        </div>

        <div className="flex items-center justify-between animate-fadeInUp px-8" style={{ animationDelay: '0.4s' }}>
          <label className="flex items-center">
            <input type="checkbox" className="w-4 h-4 text-theme-primary bg-bg-secondary border-border-primary rounded focus:ring-theme-primary focus:ring-2 accent-theme-primary" />
            <span className="ml-2 text-sm text-text-secondary">Remember me</span>
          </label>
          <a href="#" className="text-sm font-medium text-theme-primary hover:text-theme-primary-hover transition-colors duration-200">
            Forgot password?
          </a>
        </div>

        <div className="animate-fadeInUp px-8" style={{ animationDelay: '0.5s' }}>
          <button
            onClick={sendRequest}
            className="w-full text-lg h-12 rounded-xl bg-theme-primary text-white hover:bg-theme-primary-hover transition-all duration-300 shadow-theme-md hover:shadow-theme-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 group"
            style={{ userSelect: 'none' }}
          >
            <span className="flex items-center justify-center gap-2">
              Sign In
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        <div className="relative my-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border-primary"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-bg-primary text-text-secondary">New to Medium?</span>
          </div>
        </div>

        <div className="text-center animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <Link 
            className="inline-flex items-center justify-center w-full h-12 px-4 text-sm font-medium text-text-primary bg-bg-secondary hover:bg-bg-tertiary border border-border-primary rounded-xl transition-all duration-200 hover:shadow-theme-sm group" 
            to={"/signup"}
          >
            <span className="flex items-center gap-2">
              Create an account
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
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
    <div>
      <label htmlFor={id} className="block mb-3 text-base font-semibold text-text-primary tracking-wide">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary group-hover:text-theme-primary transition-colors duration-200" size={22} />
        <input
          type="text"
          id={id}
          className="w-full px-12 py-3 bg-bg-secondary border border-border-primary text-text-primary placeholder-text-tertiary rounded-xl focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-bg-primary outline-none transition-all duration-200 hover:border-theme-primary/50 text-lg"
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
      <label htmlFor={id} className="block mb-3 text-base font-semibold text-text-primary tracking-wide">
        {label}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary group-hover:text-theme-primary transition-colors duration-200" size={22} />
        <input
          type={inputType}
          id={id}
          className="w-full px-12 py-3 bg-bg-secondary border border-border-primary text-text-primary placeholder-text-tertiary rounded-xl focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-bg-primary outline-none transition-all duration-200 hover:border-theme-primary/50 text-lg"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-text-secondary hover:text-theme-primary transition-colors duration-200" onClick={() => setShowPassword(prev => !prev)}>
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

