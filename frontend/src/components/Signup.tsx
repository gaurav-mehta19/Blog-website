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
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs, {
        withCredentials: true,
      });
      navigate("/blogs");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={`h-screen flex justify-center flex-col`}>
      <div className={`flex justify-center  ${showPopupCard ? "blur-sm" : ""}`}>
        <div>
          <div className="text-3xl text-center font-extrabold px-20 mb-3">
            Create an account
          </div>
          <div className="text-slate-400 px-20 mb-8">
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
            className="mt-4 w-full text-lg h-12 rounded-lg bg-black text-white"
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
              className="mt-4 w-full text-lg h-12 rounded-lg bg-blue-500 text-white"
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

