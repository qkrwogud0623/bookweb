import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHome } from 'react-icons/fa';

function TopBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  return (
    <div style={styles.container}>
      <button style={styles.homeIcon} onClick={() => navigate('/')}>
        <FaHome size={18} color="#3D3D3D" />
      </button>
      <div style={styles.rightMenu}>
        {isLoggedIn ? (
          <>
            <button style={styles.link} onClick={() => navigate('/mypage')}>
              마이페이지
            </button>
            <span style={styles.link}>|</span>
            <button style={styles.link} onClick={() => { 
              logout();              
              localStorage.removeItem('user'); 
              alert('로그아웃되었습니다.');
              window.location.reload(); 
            }}>
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
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#D9D9D9',
    padding: '8px 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    userSelect: 'none',
    boxSizing: 'border-box',
    width: '100%',
  },
  homeIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  rightMenu: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    minWidth: 0,
  },
  link: {
    background: 'none',
    border: 'none',
    color: '#3D3D3D',
    cursor: 'pointer',
    userSelect: 'none',
    fontFamily: 'Pretendard Variable',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    minWidth: 0,
  }
};

export default TopBar;
