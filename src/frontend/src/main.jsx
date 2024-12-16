import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import router from './routes/router.jsx';

import { AuthProvider } from './context/AuthContext.jsx';  // Importando o AuthProvider

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
