import { useState } from 'react';

const CATEGORIES = ['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Прочее'];

function ExpenseForm({ onAdd, currency = '₽' }) {
  const [sum, setSum] = useState('');
  const [category, setCategory] = useState('Еда');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = Number(sum);

    if (!sum) { setError('Введите сумму'); return; }
    if (isNaN(amount) || amount <= 0) {
      setError('Сумма должна быть больше 0');
      return;
    }

    onAdd({
      id: Date.now(),
      sum: amount, // храним в рублях
      category,
      date,
      desc: desc.trim(),
    });

    setSum('');
    setDesc('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="row">
        <input
          type="number"
          placeholder="Сумма, ₽"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          style={{ minWidth: 140 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Описание"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ flex: 1, minWidth: 180 }}
        />
        <button className="btn" type="submit">Добавить</button>
      </div>
      {error && <p className="error">{error}</p>}
      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>
        Вводите сумму в рублях — она автоматически пересчитается в выбранную валюту ({currency}).
      </p>
    </form>
  );
}

export default ExpenseForm;