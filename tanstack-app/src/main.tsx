import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000
    }
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={appQueryClient}>
        <App />    
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
  </StrictMode>,
)
