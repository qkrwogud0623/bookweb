import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function BookRecommend({ books, userName }) {
  const [index, setIndex] = useState(0);

  const length = books.length;

  const prev = () => setIndex((prev) => (prev - 1 + length) % length);
  const next = () => setIndex((prev) => (prev + 1) % length);

  const getBook = (offset) => {
    const i = (index + offset + length) % length;
    return books[i];
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2 style={{ fontSize: '30px', fontWeight: 800 }}>
        {userName}님을 위한 추천 도서
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1rem 0' }}>
        <button onClick={prev} style={styles.arrow}>
          <FaChevronLeft size={20} />
        </button>

        <BookCard {...getBook(0)} />
        <BookCard {...getBook(1)} isCenter />
        <BookCard {...getBook(2)} />

        <button onClick={next} style={styles.arrow}>
          <FaChevronRight size={20} />
        </button>
      </div>

      <div style={{ textAlign: 'center', paddingLeft: '31rem', fontSize: '14px' }}>
        <Link to="/more/recommend" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555' }}>
            더보기
          </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  arrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    padding: '0 10px'
  }
};

export default BookRecommend;