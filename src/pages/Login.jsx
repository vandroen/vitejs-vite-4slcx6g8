import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u) => u.username === username && u.password === password);

    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', 'admin');
      localStorage.setItem('role', 'admin');
      window.dispatchEvent(new Event('auth-updated'));
      navigate('/expenses');
    } else if (username === 'manager' && password === '1234') {
      localStorage.setItem('user', 'manager');
      localStorage.setItem('role', 'manager');
      window.dispatchEvent(new Event('auth-updated'));
      navigate('/expenses');
    } else if (found) {
      localStorage.setItem('user', found.username);
      localStorage.setItem('role', 'user');
      window.dispatchEvent(new Event('auth-updated'));
      navigate('/expenses');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 360, margin: '40px auto' }}>
      <h1>Вход</h1>
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
      {error && <p className="error">{error}</p>}
      <button className="btn" onClick={handleLogin}>Войти</button>
      <p style={{ marginTop: 12, fontSize: 13, color: '#6b7280' }}>
        Демо: admin / 1234. <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
}

export default Login;