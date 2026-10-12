function CategoryFilter({ value, onChange }) {
  const categories = ['Все', 'Работа', 'Учёба', 'Дом'];
  return (
    <div className="row">
      {categories.map(c => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={value === c ? 'btn' : 'btn btn-secondary'}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;