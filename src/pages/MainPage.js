import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import BookRecommend from '../components/BookRecommend';
import RiskBookList from '../components/RiskBookList'; // ← 꼭 최상단에 위치
import dummyBooks from '../data/dummyBooks';
import dummyUsers from '../data/dummyUsers';

function MainPage() {
  const user = dummyUsers[0];

  return (
    <div>
      <TopBar />
      <SearchBar />
      <BookRecommend books={dummyBooks} userName={user.name} />
      <div style={{ padding: '1rem 5rem' }}>
        <RiskBookList books={dummyBooks} />
      </div>
    </div>
  );
}

export default MainPage;