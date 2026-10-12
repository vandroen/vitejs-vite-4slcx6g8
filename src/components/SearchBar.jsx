function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Поиск по названию..."
      style={{ minWidth: 260 }}
    />
  );
}

export default SearchBar;