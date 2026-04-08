import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { VisitasProvider } from '@/store/visitas'
import { DashboardPage, AdminPage, GuardiaPage, ComponentsPage, ProveedorPage } from '@/components/pages'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <VisitasProvider>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/guardia" element={<GuardiaPage />} />
          <Route path="/provider/access" element={<ProveedorPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/settings" element={<ComponentsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </VisitasProvider>
    </BrowserRouter>
  )
}

export default App

