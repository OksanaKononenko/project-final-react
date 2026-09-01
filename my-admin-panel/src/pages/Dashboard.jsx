import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import UserList from '../components/UserList';
import CreateUserModal from '../components/CreateUserModal';
import { Button, Container, Typography } from '@mui/material';
 
const Dashboard = () => {
  const dispatch = useDispatch();
  // Стан для відкриття/закриття модального вікна
  const [modalOpen, setModalOpen] = useState(false);

  // Функція виходу з системи
  const handleLogout = () => {
    dispatch(logout()); // Викликаємо екшен logout для виходу
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      {/* Навігація / Шапка сторінки */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h4">Панель керування</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Вийти
        </Button>
      </div>
      
      {/* Кнопка для додавання користувача */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setModalOpen(true)} 
        style={{ marginBottom: '20px' }}
      >
        Додати користувача
      </Button>

      {/* Список користувачів */}
      <UserList />

      {/* Модальне вікно (приховане, поки modalOpen === false) */}
      <CreateUserModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Container>
  );
};

export default Dashboard;