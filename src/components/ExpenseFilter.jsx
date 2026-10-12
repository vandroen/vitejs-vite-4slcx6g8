const CATEGORIES = ['Все', 'Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Прочее'];

function ExpenseFilter({ category, onCategoryChange, sort, onSortChange }) {
  return (
    <div className="row">
      <label>
        Категория:{' '}
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <label>
        Сортировка:{' '}
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date-desc">Дата (сначала новые)</option>
          <option value="date-asc">Дата (сначала старые)</option>
          <option value="sum-desc">Сумма (по убыванию)</option>
          <option value="sum-asc">Сумма (по возрастанию)</option>
        </select>
      </label>
    </div>
  );
}

export default ExpenseFilter;