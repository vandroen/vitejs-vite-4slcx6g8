import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    const update = () => setUser(localStorage.getItem('user'));
    window.addEventListener('auth-updated', update);
    return () => window.removeEventListener('auth-updated', update);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.dispatchEvent(new Event('auth-updated'));
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/about">О проекте</NavLink>
      {user && <NavLink to="/expenses">Расходы</NavLink>}
      {user && <NavLink to="/dashboard">Панель</NavLink>}
      {user && <NavLink to="/settings">Настройки</NavLink>}   {/* ← новое */}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#9ca3af', fontSize: 13 }}>{user}</span>
            <button onClick={handleLogout}>Выйти</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Войти</NavLink>
            <NavLink to="/register">Регистрация</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;