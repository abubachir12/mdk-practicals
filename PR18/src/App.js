import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import Contact from './pages/contact/Contact';
import ContactSuccess from './pages/contact/ContactSuccess';
import Login from './pages/account/Login';
import Profile from './pages/account/Profile';
import NotFound from './pages/NotFound';

// Все маршруты вложены в Layout: шапка и меню общие, страница меняется в <Outlet />
export function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:id" element={<ProductDetail />} />
      <Route path="contact" element={<Contact />} />
      <Route path="contact/success" element={<ContactSuccess />} />
      <Route path="login" element={<Login />} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>;
}

// Флаги future включают поведение React Router 7 и убирают предупреждения в консоли
export const routerFuture = { v7_startTransition: true, v7_relativeSplatPath: true };

export default function App() {
  return <AuthProvider>
    <BrowserRouter future={routerFuture}><AppRoutes /></BrowserRouter>
  </AuthProvider>;
}
