import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { VisitasProvider } from '@/store/visitas'
import {  AdminPage, GuardiaPage, ComponentsPage, ProveedorPage, DashboardPage } from '@/components/pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <VisitasProvider>
        <Routes>
          <Route path="/" element={<ProveedorPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/guardia" element={<GuardiaPage />} />
          <Route path="/provider/access" element={<ProveedorPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/settings" element={<ComponentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
        </Routes>
      </VisitasProvider>
    </BrowserRouter>
  )
}

export default App

