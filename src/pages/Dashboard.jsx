import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatMoney } from '../utils/currency';

function Dashboard() {
  const user = localStorage.getItem('user');
  const role = localStorage.getItem('role');

  const [currency, setCurrency] = useState(
    localStorage.getItem('currency') || '₽'
  );

  useEffect(() => {
    const update = () => setCurrency(localStorage.getItem('currency') || '₽');
    window.addEventListener('currency-updated', update);
    return () => window.removeEventListener('currency-updated', update);
  }, []);

  const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
  const total = expenses.reduce((s, i) => s + i.sum, 0);

  return (
    <div>
      <h1>Личный кабинет</h1>
      <p>
        Привет, <b>{user}</b> (роль: {role})!
      </p>

      <div className="card">
        <p>Всего записей: <b>{expenses.length}</b></p>
        <p>Общая сумма расходов: <b>{formatMoney(total, currency)}</b></p>
        <Link to="/expenses" className="btn">Перейти к расходам</Link>
      </div>
    </div>
  );
}

export default Dashboard;