import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/Signup"
import { SigninPage } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Toaster } from 'sonner'
import { RecoilRoot } from "recoil"
import { Profile  } from "../context/Profile"


function App() {

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    <Profile>
    <Toaster richColors />
    <Routes>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/publish" element={<Publish/>}/>
    </Routes>
    </Profile>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
