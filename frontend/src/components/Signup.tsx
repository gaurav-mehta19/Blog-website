import { SignupInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { ChangeEvent } from "react";
import { showPasswordAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/showPassword";
import { useRecoilValue, useRecoilState } from "recoil";
import { toast } from "sonner";
import { Mail, Lock } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { NotebookText, BookOpen, LucideIcon } from 'lucide-react';

export const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const showPassword = useRecoilValue(showPasswordAtom);

  async function handleSubmit() {
    if (postInputs.email.trim().length < 1 || postInputs.password.trim().length < 1 || postInputs.name.trim().length < 1 || postInputs.description.trim().length < 1) {
      toast.warning("Please fill all fields");
      return;
    }
    if(postInputs.password.trim().length < 8){
      toast.warning("Password length must be 8")
      return;
    }

    const loadingToastId = toast.loading("Creating account...");
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs, {
        withCredentials: true,
      });
      toast.dismiss(loadingToastId);
      toast.success("Account created successfully");
      navigate("/blogs");
    } catch (e:any) {
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
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="bg-bg-primary border border-border-primary rounded-3xl shadow-theme-xl p-8 md:p-12 animate-fadeInUp">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mb-4">
              <div className="w-12 h-12 bg-theme-primary rounded-full flex items-center justify-center mx-auto shadow-theme-lg animate-float">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-playfair font-bold mb-1 text-text-primary">
              Join Medium
            </h1>
            <p className="text-text-secondary font-inter text-xs">
              Start your writing journey today
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Email Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <LabelledInput
                id="signupEmail"
                label="Email"
                placeholder="Enter your email address"
                Icon={Mail}
                onChange={(e) => {
                  setPostInputs((c) => ({ ...c, email: e.target.value }));
                }}
              />
            </div>

            {/* Name Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <LabelledInput
                id="name"
                label="Full Name"
                placeholder="Enter your full name"
                Icon={UserRound}
                onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))}
              />
            </div>

            {/* Bio Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <LabelledInput
                id="description"
                Icon={NotebookText}
                label="Bio"
                placeholder="Tell us about yourself"
                onChange={(e) => setPostInputs((c) => ({ ...c, description: e.target.value }))}
              />
            </div>

            {/* Password Input */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <LabelledInputPassword
                id="signupPassword"
                type={showPassword ? "text" : "password"}
                label="Password"
                Icon={Lock}
                placeholder="Create a strong password"
                onChange={(e) => {
                  setPostInputs((c) => ({ ...c, password: e.target.value }));
                }}
              />
              <p className="mt-2 text-sm font-inter text-text-secondary">Must be at least 8 characters long</p>
            </div>

            {/* Terms & Conditions */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 mt-0.5 text-theme-primary bg-bg-secondary border-border-primary rounded focus:ring-theme-primary focus:ring-2 accent-theme-primary" 
                />
                <span className="ml-2 text-sm font-inter text-text-secondary leading-relaxed">
                  I agree to the <a href="#" className="text-theme-primary hover:underline">Terms</a> and <a href="#" className="text-theme-primary hover:underline">Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Create Account Button */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
              <button
                className="w-full font-inter font-semibold text-xl h-16 rounded-xl bg-theme-primary text-white hover:bg-theme-primary-hover transition-all duration-300 shadow-theme-md hover:shadow-theme-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2"
                style={{ userSelect: 'none' }}
                onClick={handleSubmit}
              >
                <span className="flex items-center justify-center gap-2">
                  Create Account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-primary"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-bg-primary font-inter text-sm text-text-secondary">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.9s' }}>
              <Link 
                className="inline-flex items-center justify-center w-full h-16 text-lg font-inter font-medium text-text-primary bg-bg-secondary hover:bg-bg-tertiary border-2 border-border-primary rounded-xl transition-all duration-200 hover:shadow-theme-sm group" 
                to={"/signin"}
              >
                <span className="flex items-center gap-2">
                  Sign in instead
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
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
      <label htmlFor={id} className="block mb-3 text-lg font-inter font-semibold text-text-primary tracking-wide">
        {label}
      </label>
      <div className="relative group w-full">
        <Icon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-text-secondary group-hover:text-theme-primary transition-colors duration-200" size={24} />
        <input
          type="text"
          id={id}
          className="w-full pl-16 pr-6 py-5 bg-bg-secondary border-2 border-border-primary text-text-primary placeholder-text-tertiary rounded-xl focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-bg-primary outline-none transition-all duration-200 hover:border-theme-primary/50 text-xl font-inter"
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
      <label htmlFor={id} className="block mb-3 text-lg font-inter font-semibold text-text-primary tracking-wide">
        {label}
      </label>
      <div className="relative group w-full">
        <Icon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-text-secondary group-hover:text-theme-primary transition-colors duration-200" size={24} />
        <input
          type={inputType}
          id={id}
          className="w-full pl-16 pr-16 py-5 bg-bg-secondary border-2 border-border-primary text-text-primary placeholder-text-tertiary rounded-xl focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20 focus:bg-bg-primary outline-none transition-all duration-200 hover:border-theme-primary/50 text-xl font-inter"
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
      }
    </div>
  )
}