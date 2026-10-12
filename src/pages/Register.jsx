import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    setError('');

    if (!username || !password) { setError('Заполните все поля'); return; }
    if (password !== confirm) { setError('Пароли не совпадают'); return; }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u) => u.username === username)) {
      setError('Пользователь уже существует');
      return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    navigate('/login');
  };

  return (
    <div className="card" style={{ maxWidth: 360, margin: '40px auto' }}>
      <h1>Регистрация</h1>
      <input
        placeholder="Логин"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="Подтверждение пароля"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: 10 }}
      />
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={handleRegister}>Зарегистрироваться</button>
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
}

export default Register;