import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Homepage'

function App() {

  return (
    <>
      <div className='h-full w-full  bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] text-white
 flex flex-col '>
        <Routes>
          <Route path='/' element={<Home/>} ></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
// min-h-screen bg-gradient-to-r from-[#0f0f0f] via-[#1a1a1a] to-[#111827] text-gray-100
// bg-gradient-to-b from-[#0a0f1f] via-[#0f172a] to-[#020617]
