import { Link } from 'react-router-dom';

function Home() {
  const user = localStorage.getItem('user');

  return (
    <div>
      <h1>Дневник расходов</h1>
      <p>Учебный проект: React + React Router + авторизация + localStorage.</p>

      <ul style={{ lineHeight: 2 }}>
        <li><Link to="/about">О проекте</Link></li>
        {user ? (
          <>
            <li><Link to="/expenses">Мои расходы</Link></li>
            <li><Link to="/dashboard">Личный кабинет</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Войти</Link></li>
            <li><Link to="/register">Регистрация</Link></li>
          </>
        )}
      </ul>

      <p style={{ color: '#6b7280', fontSize: 14 }}>
        Демо-вход: <b>admin / 1234</b> или <b>manager / 1234</b>
      </p>
    </div>
  );
}

export default Home;