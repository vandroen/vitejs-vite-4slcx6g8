function GenreFilter({ value, onChange, genres }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="Все">Все жанры</option>
      {genres.map(g => <option key={g}>{g}</option>)}
    </select>
  );
}

export default GenreFilter;