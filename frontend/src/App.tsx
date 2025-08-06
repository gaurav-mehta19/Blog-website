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
import ProtectedRoute from "./components/Route_protect"

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Toaster richColors />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
            <Route path="/blog/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
            <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
            <Route path="/profilepage" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/myblogs/:userId" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
            <Route path="/myblog/:userId/:id" element={<ProtectedRoute><Blog /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
