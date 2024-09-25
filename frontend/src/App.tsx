import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/Signup"
import { SigninPage } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { Toaster } from 'sonner'
import { RecoilRoot } from "recoil"
import { ProfilePage } from "./pages/ProfilePage"
import { MyBlogs } from "./pages/MyBlogs"


function App() {

  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
    
    <Toaster richColors />
    <Routes>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/signin" element={<SigninPage/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/blog/:id" element={<Blog/>}/>
      <Route path="/publish" element={<Publish/>}/>
      <Route path="/profilepage" element={<ProfilePage/>}/>
      <Route path="/myBlogs" element={<MyBlogs/>}/>
    </Routes>
  
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
