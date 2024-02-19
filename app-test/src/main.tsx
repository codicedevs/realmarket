import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Auth } from './components/Auth.tsx'
import './index.css'
import Home from './pages/Home.tsx'

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Auth />,
  },
  {
    id: "inicio",
    path: "/inicio",
    element: <Home/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />    
  </React.StrictMode>,
)
