import { formatMoney } from '../utils/currency';

function ExpenseList({ items, onRemove, currency = '₽' }) {
  if (items.length === 0) return <p className="empty">Записей нет</p>;

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Категория</th>
            <th>Описание</th>
            <th style={{ textAlign: 'right' }}>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.desc || '—'}</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>
                {formatMoney(item.sum, currency)}
              </td>
              <td style={{ textAlign: 'right' }}>
                <button
                  className="btn btn-danger"
                  onClick={() => onRemove(item.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;