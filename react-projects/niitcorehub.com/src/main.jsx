import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { router } from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { StaffDataProvider } from './context/StaffDataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <StaffDataProvider>
        <RouterProvider router={router} />
      </StaffDataProvider>
    </AuthProvider>
  </StrictMode>,
)

