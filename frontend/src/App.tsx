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
import { HomePage } from "./pages/LandingPage"
import AppLayout from "./components/Route_protect"



function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
        <AppLayout>
          <Toaster richColors />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/myblogs/:userId" element={<MyBlogs />} />
            <Route path="/myblog/:userId/:id" element={<Blog />} />
          </Routes>
          </AppLayout>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
