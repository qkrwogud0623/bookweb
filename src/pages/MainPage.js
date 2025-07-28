import TopBar from '../components/TopBar';
import SearchBar from '../components/SearchBar';
import BookRecommend from '../components/BookRecommend';
import dummyBooks from '../data/dummyBooks';
import dummyUsers from '../data/dummyUsers';

function MainPage() {
  const user = dummyUsers[0];

  return (
    <div>
      <TopBar />
      <SearchBar />
      <BookRecommend books={dummyBooks} userName={user.name} />
    </div>
  );
}

export default MainPage;