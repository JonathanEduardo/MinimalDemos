import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ComponentsPage } from '@/components/pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/components" element={<ComponentsPage />} />
 
  

   

   
      </Routes>
    </BrowserRouter>
  )
}

export default App
