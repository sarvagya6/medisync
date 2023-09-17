import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Home } from './pages/home.page';
import { Login } from './pages/login.page';
import { Dashboard } from './pages/dashboard.page';
import { Case } from './pages/case.page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>,
      <Route index={true} path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="case/:id" element={<Case />} />
    </Route>
  ),
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();

