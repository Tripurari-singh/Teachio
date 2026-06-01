import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Homepage'
import { LoginPage } from './pages/auth/Login'
import { SignupPage } from './pages/auth/Signup'
import { CoursesPage } from './pages/courses/Courses'
import { CourseDetailPage } from './pages/courses/CourseDetail'
import { DashboardPage } from './pages/dashboard/Dashboard'
import { AboutPage } from './pages/About'
import { ContactPage } from './pages/Contact'
import { PrivateRoute } from './components/common/PrivateRoute'

function App() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-r from-black via-neutral-900 to-black text-white'>
      <Routes>
        <Route path='/'              element={<Home />} />
        <Route path='/login'         element={<LoginPage />} />
        <Route path='/signup'        element={<SignupPage />} />
        <Route path='/courses'       element={<CoursesPage />} />
        <Route path='/courses/:id'   element={<CourseDetailPage />} />
        <Route path='/about'         element={<AboutPage />} />
        <Route path='/contact'       element={<ContactPage />} />
        <Route path='/dashboard'     element={
          <PrivateRoute><DashboardPage /></PrivateRoute>
        } />
      </Routes>
    </div>
  )
}

export default App
