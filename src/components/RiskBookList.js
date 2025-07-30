import { useState } from 'react';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function RiskBookList({ books }) {
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id) => {
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <h2 style={styles.heading}>사라질 위기의 책들</h2>

      <div
        style={{
          maxWidth: '530px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={styles.listContainer}>
          {[...books]
            .sort((a, b) => b.discardScore - a.discardScore)
            .slice(0, 2)
            .map((book) => (
              <div key={book.id} style={styles.card}>
                <Link to={`/book/${book.id}`}>
                  <img src={book.image} alt={book.title} style={styles.image} />
                </Link>

                <div style={styles.content}>
                  <div style={styles.textSection}>
                    <p style={styles.title}>{book.title}</p>
                    <p style={styles.author}>{book.author}</p>
                    <p style={styles.recent}>
                      최근 대출: {book.lastLoan || '0000.00.00'}
                    </p>
                    <p style={styles.discard}>
                      폐기 후보 점수: {book.discardScore}점
                    </p>
                  </div>
                  <div style={styles.actionSection}>
                    <button style={styles.button}>대출하기</button>
                    <div style={styles.iconRow}>
                      <div onClick={() => toggleLike(book.id)} style={styles.icon}>
                        {likes[book.id] ? <FaHeart color="red" /> : <FaRegHeart />}
                      </div>
                      <div
                        onClick={() => toggleBookmark(book.id)}
                        style={styles.icon}
                      >
                        {bookmarks[book.id] ? (
                          <FaBookmark color="#333" />
                        ) : (
                          <FaRegBookmark />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* 줄바꿈 효과는 gap으로 이미 적용됨 */}

        {/* 더보기 버튼 - 우측 정렬 */}
        <div style={{ textAlign: 'right', fontSize: '14px' }}>
          <Link to="/more/risk" style={{ textDecoration: 'none' }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#555',
              }}
            >
              더보기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  heading: {
    fontSize: '30px',
    fontWeight: 800,
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center'
  },
  card: {
    display: 'flex',
    padding: '1rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    alignItems: 'center',
    width: '100%',
    maxWidth: '450px',
    margin: '0 auto',
  },
  image: {
    width: '100px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginRight: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '150px',
    gap: '9px',
  },
  title: {
    marginTop: 0,
    fontSize: '20px',
    fontWeight: 700,
    lineHeight: '0.1',
    marginBottom: '0px',
  },
  author: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#3D3D3D',
    lineHeight: '0.1',
    marginBottom: '18px',
  },
  recent: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '0.1',
    marginBottom: '0px',
  },
  discard: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'crimson',
    lineHeight: '0.0',
    marginBottom: '0px',
  },
  actionSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '150px',
    gap: '8px',
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '25px',
  },
  icon: {
    fontSize: '22px',
    cursor: 'pointer',
  },
  button: {
    fontSize: '16px',
    fontWeight: 600,
    padding: '4px 10px',
    backgroundColor: '#3d3d3d',
    color: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default RiskBookList;
