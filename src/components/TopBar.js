import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function TopBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        <>
          <button style={styles.link} onClick={() => navigate('/mypage')}>
            마이페이지
          </button>
          <span style={styles.link}>|</span>
          <button style={styles.link} onClick={() => { logout(); navigate('/'); }}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button style={styles.link} onClick={() => navigate('/login')}>
            로그인
          </button>
          <span style={styles.link}>|</span>
          <button style={styles.link} onClick={() => navigate('/register')}>
            회원가입
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#D9D9D9',
    padding: '8px 20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '14px',
    userSelect: 'none'
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#3D3D3D',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'Pretendard Variable',
    fontWeight: 700
  }
};

export default TopBar;
