import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. GET: Отримання користувачів
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('http://localhost:3000/users');
  return await response.json(); 
});

// 2. POST: Додавання користувача
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser) 
  });
  return await response.json(); 
});

// 3. DELETE: Видалення користувача
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
  return id; 
});

// 4. PUT: Оновлення користувача (НОВИЙ ЗАПИТ)
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  const response = await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
    method: 'PUT', // Метод PUT перезаписує дані користувача
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedUser)
  });
  return await response.json(); 
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle' },
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; 
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload); 
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      })
      // Обробляємо успішне оновлення
      .addCase(updateUser.fulfilled, (state, action) => {
        // Знаходимо користувача в списку і замінюємо його новим варіантом
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default usersSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // 1. Беремо користувачів з бази
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await fetch('http://localhost:3000/users');
//   return await response.json(); 
// });

// // 2. Відправляємо нового користувача в базу (POST)
// export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
//   const response = await fetch('http://localhost:3000/users', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(newUser) 
//   });
//   return await response.json(); 
// });

// // 3. Видаляємо користувача з бази (DELETE)
// export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
//   await fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' });
//   return id; 
// });

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: { list: [], status: 'idle' },
//   reducers: {}, 
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.list = action.payload; 
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.list.push(action.payload); // Додаємо на екран тільки після успіху бази
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.list = state.list.filter(u => u.id !== action.payload);
//       });
//   }
// });

// export default usersSlice.reducer;





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   list: [], 
// };

// const usersSlice = createSlice({
//   name: 'users',
//   initialState,
//   reducers: {
//     addUser: (state, action) => {
//       state.list.push(action.payload);
//     },
//     deleteUser: (state, action) => {
//       state.list = state.list.filter(user => user.id !== action.payload);
//     },
//     updateUser: (state, action) => {
//       const index = state.list.findIndex(user => user.id === action.payload.id);
//       if (index !== -1) {
//         state.list[index] = action.payload;
//       }
//     },
//   },
// });

// export const { addUser, deleteUser, updateUser } = usersSlice.actions;
// export default usersSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // 1. Создаем асинхронный "санк" для запроса на бекенд
// export const fetchUsers = createAsyncThunk(
//   'users/fetchUsers',
//   async () => {
//     // Делаем GET-запрос к нашему локальному серверу
//     const response = await fetch('http://localhost:3000/users');
//     if (!response.ok) {
//       throw new Error('Ошибка сервера');
//     }
//     // Возвращаем данные, которые автоматически попадут в action.payload
//     return await response.json(); 
//   }
// );

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     list: [], // Изначально список пуст! Мы ждем данные с сервера
//     status: 'idle', // Статус загрузки (ожидание)
//   },
//   reducers: {
//     // Старые функции пока оставляем для добавления и удаления
//     addUser: (state, action) => { state.list.push(action.payload); },
//     deleteUser: (state, action) => { state.list = state.list.filter(u => u.id !== action.payload); }
//   },
//   // 2. Обрабатываем результаты запроса к бекенду
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = 'loading'; // Запрос пошел, показываем загрузку
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         // Ура! Данные пришли. Записываем их в наш список!
//         state.list = action.payload; 
//       })
//       .addCase(fetchUsers.rejected, (state) => {
//         state.status = 'failed';
//       });
//   }
// });

// export const { addUser, deleteUser } = usersSlice.actions;
// export default usersSlice.reducer;