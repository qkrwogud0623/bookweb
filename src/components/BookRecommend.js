import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function BookRecommend({ books }) {
  const [index, setIndex] = useState(0);

  const length = books.length;

  const prev = () => setIndex((prev) => (prev - 1 + length) % length);
  const next = () => setIndex((prev) => (prev + 1) % length);

  const getBook = (offset) => {
    const i = (index + offset + length) % length;
    return books[i];
  };

  const savedUser = JSON.parse(localStorage.getItem('user'));
  const displayName = savedUser?.name || '사용자';

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>
        {displayName}님을 위한 추천 도서
      </h2>
      <div
        style={{
          maxWidth: '530px', 
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {/* 카드 + 화살표 컨테이너 */}
        <div style={styles.container}>
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
  
        {/* 더보기 버튼을 같은 부모 내부 우측 정렬 */}
        <div style={{ textAlign: 'right', fontSize: '14px' }}>
          <Link to="/more/recommend" style={{ textDecoration: 'none' }}>
            <button style={styles.moreButton}>
              더보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );  
}

const styles = {
  wrapper: {
    padding: '0 1rem',
    boxSizing: 'border-box',
    textAlign: 'center',
    marginTop: '4rem',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 800,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0',
    gap: '0.5rem',
    overflowX: 'auto',
  },
  arrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    padding: '0 10px',
    flexShrink: 0,
  },
  moreButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
  },
};

export default BookRecommend;
