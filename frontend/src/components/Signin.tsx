import { SigninInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { showPasswordAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/showPassword";
import { useRecoilState } from "recoil";
import { useRecoilValue } from "recoil";
import { BookOpen, Lock, FileText, UserRound } from 'lucide-react';
import { toast } from "sonner";
import { LucideIcon, Mail } from "lucide-react";
import { ButtonLoading } from "./Loading";

export const Signin = () => {
  const navigate = useNavigate();
  const showPassword = useRecoilValue(showPasswordAtom);
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  async function sendRequest() {
    if (postInputs.email.trim().length < 1 || postInputs.password.trim().length < 1) {
      toast.warning("Please fill all fields");
      return;
    }
    if(postInputs.password.trim().length < 8){
      toast.warning("Password length must be 8")
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh]">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-theme-primary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-800">
              Welcome back!
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to your account to continue your financial journey
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
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

            {/* Password Input */}
            <div>
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

            {/* Forgot Password */}
            <div className="text-right">
              <a 
                href="#" 
                className="text-theme-primary font-medium hover:text-theme-primary-hover transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                onClick={sendRequest}
                disabled={isLoading}
                className="w-full h-14 bg-theme-primary text-white font-semibold text-lg rounded-2xl hover:bg-theme-primary-hover transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-theme-primary/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? <ButtonLoading text="Signing in..." /> : "Sign In"}
              </button>
            </div>

            {/* Create account link */}
            <div className="text-center pt-6">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-theme-primary font-semibold hover:text-theme-primary-hover transition-colors">
                Create one now
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-theme-primary to-theme-primary-hover p-12 items-center justify-center">
          <div className="text-white max-w-md">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Welcome Back to Medium
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Continue Writing</h3>
                  <p className="text-white/80">Pick up where you left off with your drafts</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <UserRound className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Your Network</h3>
                  <p className="text-white/80">Connect with your followers and fellow writers</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Personalized Feed</h3>
                  <p className="text-white/80">Discover stories tailored to your interests</p>
                </div>
              </div>
            </div>
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
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          id={id}
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-500 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all duration-300 text-base"
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
    <div className="w-full">
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type={inputType}
          id={id}
          className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-200 text-gray-800 placeholder-gray-500 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all duration-300 text-base"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200" onClick={() => setShowPassword(prev => !prev)}>
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      }
    </div>
  )
}