import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Toaster } from 'sonner'
import { RecoilRoot } from "recoil"
import { lazy, Suspense } from "react"
import { HomePage } from "./pages/LandingPage"
import ProtectedRoute from "./components/Route_protect"

// Lazy load heavy components to improve initial load performance
const SignupPage = lazy(() => import("./pages/Signup").then(m => ({ default: m.SignupPage })))
const SigninPage = lazy(() => import("./pages/Signin").then(m => ({ default: m.SigninPage })))
const Blog = lazy(() => import("./pages/Blog").then(m => ({ default: m.Blog })))
const Blogs = lazy(() => import("./pages/Blogs").then(m => ({ default: m.Blogs })))
const Publish = lazy(() => import("./pages/Publish").then(m => ({ default: m.Publish })))
const ProfilePage = lazy(() => import("./pages/ProfilePage").then(m => ({ default: m.ProfilePage })))
const MyBlogs = lazy(() => import("./pages/MyBlogs").then(m => ({ default: m.MyBlogs })))

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen bg-bg-secondary flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-theme-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-text-secondary font-inter">Loading...</p>
    </div>
  </div>
)

function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Toaster richColors />
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
