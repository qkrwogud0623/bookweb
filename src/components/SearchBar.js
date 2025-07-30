import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import dummyBooks from '../data/dummyBooks';
import { useState } from 'react';
import Select from 'react-select';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const getInitials = (text) => {
    const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const result = [];
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i) - 0xac00;
      if (code >= 0 && code <= 11172) {
        result.push(CHO[Math.floor(code / 588)]);
      } else {
        result.push(text[i]);
      }
    }
    return result.join('');
  };

  const getFieldValue = (book) => {
    if (searchType === 'title') return book.title;
    if (searchType === 'author') return book.author;
    if (searchType === 'publisher') return book.publisher;
    return '';
  };

  const getPlaceholder = () => {
    if (searchType === 'title') return '도서명을 입력해주세요';
    if (searchType === 'author') return '저자명을 입력해주세요';
    if (searchType === 'publisher') return '출판사를 입력해주세요';
    return '';
  };

  const filterSuggestions = (input) => {
    const inputInitial = getInitials(input);
    return dummyBooks.filter((book) => {
      const field = getFieldValue(book);
      const fieldInitial = getInitials(field);
      return field.includes(input) || fieldInitial.includes(inputInitial);
    });
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (query.trim() === '') return;
    setSuggestions(filterSuggestions(query));
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 100); // 자동완성 클릭 허용용 딜레이
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    setSuggestions(filterSuggestions(input));
  };

  const handleSelect = (title) => {
    setQuery('');
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(title)}`);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.inputWrapper}>
        <div style={{ minWidth: '10px' }}>
          <Select
            options={[
              { value: 'title', label: '책 제목' },
              { value: 'author', label: '저자' },
              { value: 'publisher', label: '출판사' }
            ]}
            value={{
              value: searchType,
              label:
                searchType === 'title'
                  ? '책 제목'
                  : searchType === 'author'
                  ? '저자'
                  : '출판사'
            }}
            onChange={(selectedOption) => setSearchType(selectedOption.value)}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                fontWeight: '800',
                fontFamily: 'Pretendard Variable',
                fontSize: '16px',
                cursor: 'pointer',
                width: '110px'
              }),
              indicatorSeparator: () => ({ display: 'none' }),
              dropdownIndicator: (base) => ({
                ...base,
                color: '#3D3D3D'
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999
              })
            }}
            isSearchable={false}
          />
        </div>

        <input
          type="text"
          placeholder={getPlaceholder()}
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.input}
        />

        <button style={styles.button}>
          <FaSearch color="#000000" size={18} />
        </button>

        {isFocused && suggestions.length > 0 && (
          <ul style={styles.dropdown}>
            {suggestions.map((book) => (
              <li key={book.id} style={styles.item} onClick={() => handleSelect(book.title)}>
                <img src={book.image} alt={book.title} style={styles.thumbnail} />
                <div style={styles.bookInfo}>
                  <div style={styles.bookTitle}>{book.title}</div>
                  <div style={styles.bookMeta}>
                    <span>저자: {book.author}</span>
                    <span>출판사: {book.publisher}</span>
                    <span>폐기점수: {book.discardScore}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
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
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'visible',
    width: '600px',
    userSelect: 'none',
    position: 'relative'
  },
  input: {
    color: '#3D3D3D',
    flex: 1,
    border: 'none',
    padding: '10px',
    fontSize: '16px',
    outline: 'none',
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
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '10px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 9999,
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    boxSizing: 'content-box',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fff'
  },
  thumbnail: {
    width: '45px',
    height: '70px',
    objectFit: 'cover',
    flexShrink: 0,
    boxShadow: '1px 2px 1px rgb(225, 225, 225)'
  },
  bookInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: '15px',
    color: '#3D3D3D'
  },
  bookMeta: {
    fontSize: '12px',
    color: '#555',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  }
};

export default SearchBar;
