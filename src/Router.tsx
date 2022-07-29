import { Route, Routes } from 'react-router-dom'
import App from './App'
import { StudentInfo } from './pages/studentInfo'

export function Router() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<App />} />
      <Route path="/studentInfo/:slug" element={<StudentInfo />} />
    </Routes>
  )
}
