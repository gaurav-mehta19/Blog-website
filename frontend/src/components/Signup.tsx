import { SignupInput } from "@gaurav_mehta/medium-common/dist/zod/zod";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { popupcardAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/popupCard";
import { useRecoilState } from "recoil";
import { LabelledInput, LabelledInputPassword } from "./Signin";
import { showPasswordAtom } from "@gaurav_mehta/medium-common/dist/store/atoms/showPassword";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";



export const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    description: "",
  });

  const [showPopupCard, setShowPopupCard] = useRecoilState(popupcardAtom);
  const showPassword = useRecoilValue(showPasswordAtom);

  async function handleSubmit() {
    if (postInputs.email.trim().length < 1 || postInputs.password.trim().length < 1 || postInputs.name.trim().length < 1 || postInputs.description.trim().length < 1) {
      toast.warning("Please fill all fields");
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
    } catch (e: any) {
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
    <div  style={{ userSelect: 'none' }} className={`h-screen flex justify-center flex-col`}>
      <div className={`flex justify-center  ${showPopupCard ? "blur-sm" : ""}`}>
        <div>
          <div className="text-4xl text-center font-semibold px-20 mb-2">
            Create an account
          </div>
          <div className="text-gray-400 text-center text-lg px-20 mb-8">
            Already have an account?
            <Link className="pl-1 hover:underline" to={"/signin"}>
              Sign in
            </Link>
          </div>
          <LabelledInput
            id="signupEmail"
            label="Email"
            placeholder="xyz@gmail.com"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, email: e.target.value }));
            }}
          ></LabelledInput>
          <LabelledInputPassword
            id="signupPassword"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Minimum 8 characters"
            onChange={(e) => {
              setPostInputs((c) => ({ ...c, password: e.target.value }));
            }}
          ></LabelledInputPassword>
          <button
            onClick={() => {
              setShowPopupCard((prev) => !prev);
            }}
            className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white hover:bg-gray-900"
            style={{ userSelect: 'none' }}
          >
            Sign Up
          </button>
        </div>
      </div>

      {showPopupCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between">
              <div className="text-xl font-bold mb-4">Complete Your Profile</div>
              <svg
                onClick={() => {
                  setShowPopupCard((prev) => !prev);
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 hover:rounded-full hover:bg-slate-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
            <LabelledInput
              id="name"
              label="Name"
              placeholder="John Doe"
              onChange={(e) => setPostInputs((c) => ({ ...c, name: e.target.value }))}
            />
            <LabelledInput
              id="description"
              label="Description"
              placeholder="Brief description about you"
              onChange={(e) => setPostInputs((c) => ({ ...c, description: e.target.value }))}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white hover:bg-gray-900"
              style={{ userSelect: 'none' }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

