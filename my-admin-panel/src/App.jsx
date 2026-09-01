import AppRouter from './routes/AppRouter';

const App = () => {
  return (
    <div>
      {/* Тут згодом можна буде додати загальну панель навігації (Header), яка відображатиметься на всіх сторінках */}
      
      {/* Підключаємо всі наші маршрути */}
      <AppRouter />
    </div>
  );
};

export default App;