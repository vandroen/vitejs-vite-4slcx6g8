import { useEffect, useMemo, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilter from '../components/ExpenseFilter';
import { formatMoney } from '../utils/currency';

function Expenses() {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('expenses') || '[]');
    } catch {
      return [];
    }
  });

  const [category, setCategory] = useState('Все');
  const [sort, setSort] = useState('date-desc');

  const [currency, setCurrency] = useState(
    localStorage.getItem('currency') || '₽'
  );

  // Подписка на изменение валюты
  useEffect(() => {
    const update = () => setCurrency(localStorage.getItem('currency') || '₽');
    window.addEventListener('currency-updated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('currency-updated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  // Сохранение расходов
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(items));
  }, [items]);

  const addExpense = (expense) => setItems((prev) => [...prev, expense]);
  const removeExpense = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const filtered = useMemo(() => {
    let list = items;
    if (category !== 'Все') list = list.filter((i) => i.category === category);

    return [...list].sort((a, b) => {
      switch (sort) {
        case 'date-asc': return a.date < b.date ? -1 : 1;
        case 'sum-desc': return b.sum - a.sum;
        case 'sum-asc': return a.sum - b.sum;
        case 'date-desc':
        default: return a.date < b.date ? 1 : -1;
      }
    });
  }, [items, category, sort]);

  const total = useMemo(
    () => filtered.reduce((acc, i) => acc + i.sum, 0),
    [filtered]
  );

  return (
    <div>
      <h1>Дневник расходов</h1>

      <ExpenseForm onAdd={addExpense} currency={currency} />

      <ExpenseFilter
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      <ExpenseList
        items={filtered}
        onRemove={removeExpense}
        currency={currency}
      />

      <p className="total">
        Итого: {formatMoney(total, currency)}{' '}
        <span style={{ fontSize: 14, color: '#6b7280', fontWeight: 400 }}>
          ({filtered.length} из {items.length})
        </span>
      </p>
    </div>
  );
}

export default Expenses;