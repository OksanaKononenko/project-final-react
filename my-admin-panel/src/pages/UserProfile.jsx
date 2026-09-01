
import { useState, useEffect } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Typography } from '@mui/material';
import { logout } from '../features/auth/authSlice'; 
import { updateUser } from '../features/users/usersSlice'; // Імпортуємо нашу нову функцію

const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Безпечно шукаємо користувача
  const user = useSelector(state => 
    state.users.list.find(u => u.id && u.id.toString() === id?.toString())
  );

  // Створюємо стани для полів вводу (щоб їх можна було редагувати)
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  // Якщо дані підтягнулися пізніше, оновлюємо поля
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  // Функція збереження змін
  const handleSaveChanges = () => {
    const updatedData = {
      id: user.id, // ID залишається тим самим!
      name: name,
      email: email,
      password: password
    };
    
    // Відправляємо оновлені дані на бекенд
    dispatch(updateUser(updatedData));
    
    // Повертаємося на головну панель після збереження
    navigate('/dashboard');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return <Navigate to="/404" />; 
  }

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Профіль користувача</Typography>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Ім'я:</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} // Дозволяє вводити новий текст
          style={{ width: '300px', padding: '5px' }} 
        />
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: '300px', padding: '5px' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '300px', padding: '5px' }} 
        />
      </div>

      {/* Кнопка збереження змін */}
      <Button 
        variant="contained" 
        color="success" 
        onClick={handleSaveChanges} 
        style={{ marginBottom: '20px', display: 'block' }}
      >
        Зберегти зміни
      </Button>

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1976d2', alignSelf: 'center', fontWeight: 'bold' }}>
          Повернутись на головну
        </Link>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Вийти з акаунту
        </Button>
      </div>

    </Container>
  );
};

export default UserProfile;
 





// import { useState, useEffect } from 'react';
// import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Container, Typography } from '@mui/material';
// import { logout } from '../features/auth/authSlice'; 
// import { updateUser } from '../features/users/usersSlice'; // Імпортуємо нашу нову функцію

// const UserProfile = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Безпечно шукаємо користувача
//   const user = useSelector(state => 
//     state.users.list.find(u => u.id && u.id.toString() === id?.toString())
//   );

//   // Створюємо стани для полів вводу (щоб їх можна було редагувати)
//   const [name, setName] = useState(user?.name || '');
//   const [email, setEmail] = useState(user?.email || '');
//   const [password, setPassword] = useState(user?.password || '');

//   // Якщо дані підтягнулися пізніше, оновлюємо поля
//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setPassword(user.password);
//     }
//   }, [user]);

//   // Функція збереження змін
//   const handleSaveChanges = () => {
//     const updatedData = {
//       id: user.id, // ID залишається тим самим!
//       name: name,
//       email: email,
//       password: password
//     };
    
//     // Відправляємо оновлені дані на бекенд
//     dispatch(updateUser(updatedData));
    
//     // Повертаємося на головну панель після збереження
//     navigate('/dashboard');
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/login');
//   };

//   if (!user) {
//     return <Navigate to="/404" />; 
//   }

//   return (
//     <Container style={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>Профіль користувача</Typography>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Ім'я:</label>
//         <input 
//           type="text" 
//           value={name} 
//           onChange={(e) => setName(e.target.value)} // Дозволяє вводити новий текст
//           style={{ width: '300px', padding: '5px' }} 
//         />
//       </div>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
//         <input 
//           type="email" 
//           value={email} 
//           onChange={(e) => setEmail(e.target.value)} 
//           style={{ width: '300px', padding: '5px' }} 
//         />
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
//         <input 
//           type="text" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           style={{ width: '300px', padding: '5px' }} 
//         />
//       </div>

//       {/* Кнопка збереження змін */}
//       <Button 
//         variant="contained" 
//         color="success" 
//         onClick={handleSaveChanges} 
//         style={{ marginBottom: '20px', display: 'block' }}
//       >
//         Зберегти зміни
//       </Button>

//       <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
//         <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1976d2', alignSelf: 'center', fontWeight: 'bold' }}>
//           Повернутись на головну
//         </Link>
//         <Button variant="contained" color="error" onClick={handleLogout}>
//           Вийти з акаунту
//         </Button>
//       </div>

//     </Container>
//   );
// };

// export default UserProfile;




// import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Button, Container, Typography } from '@mui/material';

// // Імпортуємо екшен для виходу (перевірте, чи правильний шлях до вашого файлу authSlice)
// import { logout } from '../features/auth/authSlice'; 

// const UserProfile = () => {
//   // 1. Отримуємо id з адреси
//   const { id } = useParams();
  
//   // 2. Ініціалізуємо хуки для дій
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // 3. Шукаємо користувача
//   // const user = useSelector(state => 
//   //   state.users.list.find(u => u.id.toString() === id.toString())
//   // );

// // 3. Шукаємо користувача безпечно (перевіряємо чи існує u.id)
//   const user = useSelector(state => 
//     state.users.list.find(u => u.id && u.id.toString() === id?.toString())
//   );


//   // 4. Функція для виходу з акаунту
//   const handleLogout = () => {
//     dispatch(logout()); // Змінює стан авторизації на false
//     navigate('/login'); // Викидає на сторінку входу
//   };

//   // 5. Якщо користувача не знайдено - редірект
//   if (!user) {
//     return <Navigate to="/404" />; 
//   }

//   // 6. Відображення сторінки
//   return (
//     <Container style={{ padding: '20px' }}> 
    
    
//       <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
//         {/* Кнопка переходу на головну через Link */}
//         {/* <Button variant="outlined" component={Link} to="/dashboard">
//           Повернутись на головну
//         </Button> */}



// {/* Звичайне посилання для переходу на головну */}
//         <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1976d2', alignSelf: 'center', fontWeight: 'bold' }}>
//           Повернутись на головну
//         </Link>


//         {/* Кнопка виходу, яка викликає нашу функцію handleLogout */}
//         <Button variant="contained" color="error" onClick={handleLogout}>
//           Вийти з акаунту
//         </Button>
//       </div>
//       <Typography variant="h4" gutterBottom>Профіль користувача</Typography>



      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Ім'я:</label>
//         <input type="text" defaultValue={user.name} style={{ width: '300px', padding: '5px' }} />
//       </div>
      
//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
//         <input type="email" defaultValue={user.email} style={{ width: '300px', padding: '5px' }} />
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
//         <input type="text" defaultValue={user.password} style={{ width: '300px', padding: '5px' }} />
//       </div>

   

//     </Container>
//   );
// };

// export default UserProfile;




