import TopBar from '../components/TopBar'; // 경로는 실제 위치에 맞게
import { useParams } from 'react-router-dom';
import dummyBooks from '../data/dummyBooks';

function BookDetail() {
  const { id } = useParams();
  const book = dummyBooks.find(book => book.id === id);

  if (!book) return <div>책을 찾을 수 없습니다.</div>;

  return (
    <div>
      <TopBar />
      <div style={{
        maxWidth: '700px',
        margin: '2rem auto',
        padding: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <img 
            src={book.image} 
            alt={book.title}
            style={{
              width: '300px',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <div>
            <h2 style={{ marginBottom: '1rem' }}>{book.title}</h2>
            <p><strong>저자 :</strong> {book.author}</p>
            <p><strong>출판사 :</strong> {book.publisher}</p>
            <p><strong>발행일 :</strong> {book.publishedDate}</p>
            <p><strong>ISBN :</strong> {book.isbn}</p>
            <p><strong>분류기호:</strong> {book.callNumber}</p>
            <p><strong>페이지 수:</strong> {book.page}쪽</p>
            <p><strong>카테고리:</strong> {book.category}</p>
            <p style={{ color: '#c0392b' }}>
              <strong>폐기후보점수:</strong> {book.discardScore}
            </p>
          </div>
        </div>
        <div><p><strong>소개</strong> <br />{book.description}</p></div>
        <div style={{ marginTop: '3rem' }}>
          <h3> 함께 대출한 도서 </h3>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
