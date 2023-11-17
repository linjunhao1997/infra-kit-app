import ReactDOM from 'react-dom/client'
import App, { Routes } from './App.tsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
    // </React.StrictMode>
<RouterProvider router={Routes}>
      <App />
    </RouterProvider>

)
   
