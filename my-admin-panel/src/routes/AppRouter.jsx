import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

import UserProfile from '../pages/UserProfile';


const AppRouter = () => {
  return (
    <Routes>
      {/* Автоматичний редірект з кореневої сторінки */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Відкритий маршрут для сторінки авторизації */}
      <Route path="/login" element={<Login />} />
      
      {/* Захищений маршрут для головної панелі */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        } 
      />
      
      {/* Захищений маршрут для профілю користувача */}
      {/* <Route 
        path="/users/:id" 
        element={
          <ProtectedRoutes>
            <div>Профіль користувача</div>
          </ProtectedRoutes>
        } 
      /> */}


{/* Захищений маршрут для профілю користувача */}
      <Route 
        path="/users/:id" 
        element={
          <ProtectedRoutes>
            {/* ТУТ МИ ЗАМІНИЛИ <div> НА КОМПОНЕНТ */}
            <UserProfile />
          </ProtectedRoutes>
        } 
      />

      
      {/* Маршрут для сторінки помилки (not found) */}
      <Route path="*" element={<div>Сторінка не знайдена</div>} />
    </Routes>
  );
};

export default AppRouter;