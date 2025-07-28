import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // 실제 프로젝트라면 여기서 API 요청을 보내야 함
    if (email && password) {
      login(); // 로그인 상태 변경
      alert('로그인 성공!');
      navigate('/'); // 홈으로 리디렉션
    } else {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '5rem'
    }}>
      <h2>로그인</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#2c3e50',
          color: 'white',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
