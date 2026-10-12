import { Link } from 'react-router-dom';

function BookCard({ book, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <h3 style={{ margin: '0 0 6px' }}>
        <Link to={`/book/${book.id}`}>{book.title}</Link>
      </h3>
      <p style={{ margin: '4px 0', color: '#6b7280' }}>{book.author}</p>
      <p style={{ margin: '4px 0' }}>Жанр: {book.genre}</p>
      <p style={{ margin: '4px 0', fontWeight: 600 }}>{book.price} ₽</p>
      <button className="btn" onClick={() => onToggleFavorite(book.id)}>
        {isFavorite ? '★ В избранном' : '☆ В избранное'}
      </button>
    </div>
  );
}

export default BookCard;