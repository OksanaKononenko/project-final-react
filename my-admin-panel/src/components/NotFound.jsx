import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Помилка 404</h1>
      <p>Сторінку не знайдено</p>
      <button onClick={() => navigate(-1)}>Повернутися назад</button>
    </div>
  );
};

export default NotFound;