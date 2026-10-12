import { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Работа');

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category });
    setTitle('');
  };

  return (
    <form onSubmit={submit} className="row">
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Название задачи" />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option>Работа</option>
        <option>Учёба</option>
        <option>Дом</option>
      </select>
      <button className="btn" type="submit">Добавить</button>
    </form>
  );
}

export default TaskForm;