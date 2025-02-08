import { SignupInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { LabelledInput, LabelledInputPassword } from "./Signin";
import { showPasswordAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/showPassword";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { Mail, Lock } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { NotebookText,BookOpen } from 'lucide-react';



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
    <div  style={{ userSelect: 'none' }} className="h-[750px] w-[500px] space-y-8 bg-white p-8 rounded-2xl shadow-xl" >
      <div className="text-center flex flex-col items-center justify-center">
        <div className="mb-4">
          <BookOpen className="h-12 w-12 text-black text-center" />
        </div>
        <div>
          <div className="text-3xl text-center font-bold mb-2">
            Join Medium
          </div>
          <p className="text-gray-600">Start your journey with us</p>
          <LabelledInput
            id="signupEmail"
            label="Email"
            placeholder="xyz@gmail.com"
            Icon={Mail}
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, email: e.target.value }));
            }}
          ></LabelledInput>
           <LabelledInput
              id="name"
              label="Name"
              placeholder="John Doe"
              Icon={UserRound}
              onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))}
            />
            <LabelledInput
              id="description"
              Icon={NotebookText}
              label="Description"
              placeholder="Brief description about you"
              onChange={(e) => setPostInputs((c) => ({ ...c, description: e.target.value }))}
            />
          <LabelledInputPassword
            id="signupPassword"
            type={showPassword ? "text" : "password"}
            label="Password"
            Icon={Lock}
            placeholder="Minimum 8 characters"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, password: e.target.value }));
            }}
          ></LabelledInputPassword>
          <p className="-mt-3 mb-3 text-xs text-gray-500 text-start">Must be at least 8 characters long</p>
          <button
            className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white hover:bg-gray-900"
            style={{ userSelect: 'none' }}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <div className="text-gray-600 text-center text-lg mt-6">
            Already have an account?
            <Link className="pl-1 text-yellow-600 hover:underline hover:text-yellow-500" to={"/signin"}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

