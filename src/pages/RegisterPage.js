import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import TopBar from '../components/TopBar';
import dummyUsers from '../data/dummyUsers';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    gender: '',
    birthYear: '',
    email: '',
    password: '',
    preferences: [] // ✅ 장르
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    const { name, gender, birthYear, email, password, preferences } = form;
    if (!name || !gender || !birthYear || !email || !password || preferences.length === 0) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    dummyUsers.push({
      id: email,
      name,
      email,
      password,
      gender,
      birthYear,
      preferences // ✅ 선택된 장르 저장
    });

    alert('회원가입이 완료되었습니다.');
    navigate('/');
  };

  const genderOptions = [
    { value: '남자', label: '남자' },
    { value: '여자', label: '여자' }
  ];

  const birthYearOptions = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => {
    const year = 1950 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const genreOptions = [
    { value: '문학', label: '문학' },
    { value: '사회과학', label: '사회과학' },
    { value: '자기계발', label: '자기계발' },
    { value: '과학', label: '과학' },
    { value: '역사', label: '역사' },
    { value: '철학', label: '철학' },
    { value: '기술', label: '기술' },
    { value: '예술', label: '예술' }
  ];  

  const selectStyle = {
    control: (base) => ({
      ...base,
      padding: '2px',
      borderRadius: '8px',
      borderColor: '#ccc',
      fontFamily: 'Pretendard Variable',
      fontSize: '1rem'
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: '150px',
      overflowY: 'auto'
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10
    })
  };

  return (
    <div>
      <TopBar />
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>회원가입</h2>
          <div style={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="이름"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />

            <Select
              options={genderOptions}
              placeholder="성별 선택"
              onChange={(selectedOption) =>
                setForm(prev => ({ ...prev, gender: selectedOption.value }))
              }
              styles={selectStyle}
            />

            <Select
              options={birthYearOptions}
              placeholder="출생년도 선택"
              onChange={(selectedOption) =>
                setForm(prev => ({ ...prev, birthYear: selectedOption.value }))
              }
              styles={selectStyle}
            />

            {/* ✅ 관심 장르 다중 선택 */}
            <Select
              isMulti
              options={genreOptions}
              placeholder="관심 장르 선택"
              onChange={(selectedOptions) =>
                setForm(prev => ({
                  ...prev,
                  preferences: selectedOptions.map(option => option.value)
                }))
              }
              styles={selectStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="이메일"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
            <button onClick={handleRegister} style={styles.button}>가입</button>
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
    boxSizing: 'border-box',
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
    alignItems: 'center',
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
    fontFamily: 'Pretendard Variable'
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
  }
};

export default RegisterPage;
