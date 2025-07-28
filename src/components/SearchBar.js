import { FaSearch } from 'react-icons/fa';

function SearchBar() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          placeholder="도서명을 입력해주세요"
          style={styles.input}
        />
        <button style={styles.button}>
          <FaSearch color="#000000" size={18} />
        </button>
      </div>
    </div>
  );
}
  
  const styles = {
    wrapper: {
      marginTop: '2rem',
      display: 'flex',
      justifyContent: 'center',
      userSelect: 'none'
    },
    inputWrapper: {
      background: '#D9D9D9',
      display: 'flex',
      border: '1px solid #ccc',
      borderRadius: '8px',
      overflow: 'hidden',
      width: '700px',
      userSelect: 'none'
    },
    input: {
      color: '#000000',
      flex: 1,
      border: 'none',
      padding: '10px 10px',
      fontSize: '18px',
      outline: 'none',
      userSelect: 'text',
      background: 'transparent',
      fontFamily: 'Pretendard Variable',
      fontWeight: 700
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
      fontSize: '18px',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
  
  export default SearchBar;
  