import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HashRouter as Router } from 'react-router-dom';


import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookDetail from './pages/BookDetail';
import MoreRecommend from './pages/MoreRecommend';
import MoreRisk from './pages/MoreRisk';
import MyPage from './pages/MyPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/mypage" element={<MyPage />} /> {/* 추가 */}
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/more/recommend" element={<MoreRecommend />} />
          <Route path="/more/risk" element={<MoreRisk />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
