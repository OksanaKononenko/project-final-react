import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { Button, Typography, Container } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(login()); // Змінюємо стейт isAuthenticated на true
    navigate('/dashboard'); // Переходимо на головну панель
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Вхід у систему
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Увійти як Адміністратор
      </Button>
    </Container>
  );
};

export default Login;