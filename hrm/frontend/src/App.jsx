import './App.css'
import { Link } from 'react-router-dom'
import { Dashboard } from './dashboard/dashboard.jsx'
import { Route, Routes } from 'react-router-dom'
import {Onboarding} from './onboarding/onboarding.jsx'
import { Employees } from './employe/employe.jsx'
import { Documents } from './documents/documents.jsx'
import { UpdateDocuments } from './updateDoc/updateDoc.jsx'
import { Asset } from './assets-page/assets.jsx'


function App() {


  return (
    <Routes>
    <Route path="/" element={<Dashboard />}/>
    <Route path='/onboarding' element={<Onboarding />} />
    <Route path='/employees' element={<Employees />} />
    <Route path='/documents' element={<Documents/>} />
    <Route path='/updateDoc' element={<UpdateDocuments/>} />
    <Route path='/asset' element={<Asset/>} />
  </Routes>
  )
}

export default App
