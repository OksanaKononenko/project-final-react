// import { useSelector } from 'react-redux';
// import UserItem from './UserItem';

// const UserList = () => {
//   // Отримуємо список користувачів з Redux-стору
//   const users = useSelector(state => state.users.list);

//   return (
//     // Використовуємо семантичні теги <ul> для списку
//     <ul style={{ listStyleType: 'none', padding: 0 }}>
//       {/* Рендеримо картки користувачів */}
//       {users.map(user => (
//         <li key={user.id}>
//           <UserItem user={user} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// // ОСЬ ЦЕЙ РЯДОК ВИПРАВЛЯЄ ВАШУ ПОМИЛКУ:
// export default UserList;


import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserItem from './UserItem';
import { fetchUsers } from '../features/users/usersSlice';

const UserList = () => {
  const dispatch = useDispatch();
  // Достаем из Redux список и статус загрузки
  const users = useSelector(state => state.users.list);
  const status = useSelector(state => state.users.status);

  // useEffect запустится один раз при открытии страницы
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers()); // Отправляем курьера на бекенд!
    }
  }, [status, dispatch]);

  // Пока данные летят по сети, показываем текст загрузки
  if (status === 'loading') {
    return <h3 style={{ color: 'blue' }}>Загрузка пользователей с сервера...</h3>;
  }

  // Если сервер упал
  if (status === 'failed') {
    return <h3 style={{ color: 'red' }}>Ошибка подключения к бекенду!</h3>;
  }

//   // Когда данные успешно пришли — рисуем карточки
//   return (
//     <ul style={{ listStyleType: 'none', padding: 0 }}>
//       {users.map(user => (
//         <li key={user.id}>
//           <UserItem user={user} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default UserList;


// Когда данные успешно пришли — рисуем карточки
  return (
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {/* 1. Добавляем слово index вот сюда: */}
      {users.map((user, index) => (
        /* 2. Говорим React: если нет user.id, бери index */
        <li key={user.id || index}>
          <UserItem user={user} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;