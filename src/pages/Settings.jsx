import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rateHint } from '../utils/currency';

function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notify, setNotify] = useState(localStorage.getItem('notify') === 'true');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || '₽');
  const [saved, setSaved] = useState(false);

  useEffect(() => setSaved(false), [theme, notify, currency]);

  const handleSave = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('notify', String(notify));
    localStorage.setItem('currency', currency);

    document.body.classList.toggle('dark', theme === 'dark');

    // 👇 важно: сообщаем приложению, что валюта изменилась
    window.dispatchEvent(new Event('currency-updated'));

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClearData = () => {
    if (!window.confirm('Удалить все расходы? Действие необратимо.')) return;
    localStorage.removeItem('expenses');
    window.dispatchEvent(new Event('expenses-updated'));
    alert('Все расходы удалены');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.dispatchEvent(new Event('auth-updated'));
    navigate('/login');
  };

  return (
    <div>
      <h1>Настройки</h1>
      <p style={{ color: '#6b7280' }}>
        Вы вошли как <b>{user}</b>
      </p>

      <div className="card">
        <h3>Внешний вид</h3>
        <div className="row">
          <label>
            Тема:{' '}
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Светлая</option>
              <option value="dark">Тёмная</option>
            </select>
          </label>

          <label>
            Валюта:{' '}
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="₽">₽ (рубль)</option>
              <option value="$">$ (доллар)</option>
              <option value="€">€ (евро)</option>
            </select>
          </label>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
          Курс: {rateHint(currency)}. Все суммы хранятся в рублях и пересчитываются автоматически.
        </p>
      </div>

      <div className="card">
        <h3>Уведомления</h3>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={notify}
            onChange={(e) => setNotify(e.target.checked)}
          />
          Показывать напоминания о расходах
        </label>
      </div>

      <div className="row">
        <button className="btn" onClick={handleSave}>Сохранить настройки</button>
        {saved && <span style={{ color: '#16a34a' }}>✓ Сохранено</span>}
      </div>

      <div className="card">
        <h3>Данные</h3>
        <div className="row">
          <button className="btn btn-danger" onClick={handleClearData}>
            Очистить расходы
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;