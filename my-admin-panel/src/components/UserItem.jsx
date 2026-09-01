import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../features/users/usersSlice';
import { Button } from '@mui/material';

const UserItem = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Динамічний перехід на сторінку профілю
  const handleViewProfile = () => {
    navigate(`/users/${user.id}`);
  };

  // Видалення користувача
  const handleDelete = () => {
    // Тимчасово використовуємо вбудоване вікно підтвердження замість ConfirmModal для уникнення нових помилок
    if (window.confirm("Ви дійсно хочете видалити цього користувача?")) {
      dispatch(deleteUser(user.id));
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      
      <Button variant="contained" color="primary" onClick={handleViewProfile} style={{ marginRight: '10px' }}>
        View Profile
      </Button>
      
      <Button variant="outlined" color="error" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

// ОСЬ ЦЕЙ РЯДОК ВИПРАВИТЬ ПОМИЛКУ:
export default UserItem;