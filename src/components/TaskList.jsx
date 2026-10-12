function TaskList({ tasks, onToggle, onRemove }) {
  if (tasks.length === 0) return <p>Список пуст</p>;
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map(t => (
        <li key={t.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
          <span style={{ textDecoration: t.done ? 'line-through' : 'none', flex: 1 }}>
            {t.title} <small style={{ color: '#6b7280' }}>[{t.category}]</small>
          </span>
          <button className="btn btn-danger" onClick={() => onRemove(t.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;