import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Scheduler from './Scheduler.jsx'
import './index.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/schedule' element={<Scheduler/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)