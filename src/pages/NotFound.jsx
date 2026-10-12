import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>404 — Страница не найдена</h1>
      <p>Такой страницы не существует.</p>
      <Link to="/" className="btn">На главную</Link>
    </div>
  );
}

export default NotFound;