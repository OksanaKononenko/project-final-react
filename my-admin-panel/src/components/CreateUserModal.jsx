import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/users/usersSlice'; // Перевірте правильність шляху
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// Припускаємо, що ваша модалка приймає пропси open (чи відкрита вона) та onClose (функція закриття)
const CreateUserModal = ({ open, onClose }) => {
  const dispatch = useDispatch();

  // Створюємо локальні стани для полів форми
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Функція, яка спрацює при натисканні на кнопку "Зберегти"
  const handleSave = () => {
    // 1. Формуємо об'єкт нового користувача (ID генерувати не треба, json-server зробить це сам!)
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    // 2. Відправляємо нашого "кур'єра" (Thunk) на бекенд
    dispatch(addUser(newUser));

    // 3. Очищаємо поля форми для наступного разу
    setName('');
    setEmail('');
    setPassword('');



    // Знімаємо фокус із кнопки, на яку щойно натиснули
    if (document.activeElement) {
      document.activeElement.blur();
    }

    // 4. Закриваємо модальне вікно
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Створити нового користувача</DialogTitle>
      
      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '10px' }}>
        <TextField 
          label="Ім'я" 
          variant="outlined" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <TextField 
          label="Email" 
          type="email" 
          variant="outlined" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <TextField 
          label="Пароль" 
          type="password" 
          variant="outlined" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Скасувати</Button>
        {/* Вішаємо нашу функцію handleSave на кнопку */}
        <Button onClick={handleSave} variant="contained" color="success">
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;