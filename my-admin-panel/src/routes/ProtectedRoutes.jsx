import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => { // Компонент отримує children
  // Перевіряємо глобальний стан isAuthenticated у сховищі auth
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Якщо true — повертаємо дочірні компоненти (пускаємо на сторінку)
  if (isAuthenticated) {
    return children;
  } 
  // Якщо false — перенаправляємо на сторінку входу
  return <Navigate to="/login" />;
};

export default ProtectedRoutes;