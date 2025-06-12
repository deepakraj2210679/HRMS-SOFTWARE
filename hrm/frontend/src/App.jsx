import './App.css'
import { Link } from 'react-router-dom'
import { Dashboard } from './dashboard/dashboard.jsx'
import { Route, Routes } from 'react-router-dom'
import {Onboarding} from './onboarding/onboarding.jsx'
import { Employees } from './employe/employe.jsx'

function App() {


  return (
    <Routes>
    <Route path="/" element={<Dashboard />}/>
    <Route path='/onboarding' element={<Onboarding />} />
    <Route path='/employees' element={<Employees />} />
  </Routes>
  )
}

export default App
