import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import TopBar from '../components/TopBar';
import dummyUsers from '../data/dummyUsers';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // ✅ 입력 정보로 유저 찾기
    const matchedUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert('이메일 또는 비밀번호가 틀렸습니다.');
      return;
    }

    // ✅ 로그인 처리
    login(matchedUser); // AuthContext 업데이트
    localStorage.setItem('user', JSON.stringify(matchedUser)); // 새로고침 대비

    alert(`${matchedUser.name}님, 환영합니다!`);
    navigate('/');
  };

  return (
    <div>
      <TopBar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>로그인</h2>

          <form onSubmit={handleLogin} style={styles.form}>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            <div style={styles.optionRow}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  style={{ marginRight: '6px' }}
                />
                아이디 저장
              </label>
              <div>
                <button onClick={(e) => e.preventDefault()} style={styles.link}>아이디 찾기</button>
                <span style={{ margin: '0 4px' }}>|</span>
                <button onClick={(e) => e.preventDefault()} style={styles.link}>비밀번호 찾기</button>
              </div>
            </div>

            <button type="submit" style={styles.button}>로그인</button>
            <button type="button" onClick={() => navigate('/register')} style={styles.subButton}>
              회원가입
            </button>
          </form>

          <div style={styles.divider} />

          <div style={styles.socialIcons}>
            <img src={process.env.PUBLIC_URL + '/icons/kakao.png'} alt="Kakao" style={styles.icon} />
            <img src={process.env.PUBLIC_URL + '/icons/naver.png'} alt="Naver" style={styles.icon} />
            <img src={process.env.PUBLIC_URL + '/icons/google.png'} alt="Google" style={styles.icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    fontFamily: 'Pretendard Variable',
    userSelect: 'none',
    padding: '0 1rem',
    boxSizing: 'border-box'
  },
  card: {
    backgroundColor: '#D9D9D9',
    borderRadius: '20px',
    padding: '2rem 3rem',
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    fontFamily: 'Pretendard Variable',
    userSelect: 'text'
  },
  button: {
    backgroundColor: '#3D3D3D',
    color: 'white',
    fontWeight: 'bold',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'Pretendard Variable'
  },
  subButton: {
    backgroundColor: '#FFF',
    color: '#3D3D3D',
    fontWeight: 'bold',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'Pretendard Variable'
  },
  optionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#333',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 500,
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer'
  },
  divider: {
    marginTop: '1.5rem',
    marginBottom: '0.75rem',
    width: '100%',
    borderTop: '1px solid #aaa'
  },
  socialIcons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem'
  },
  icon: {
    width: '30px',
    height: '30px',
    cursor: 'pointer'
  }
};

export default LoginPage;
