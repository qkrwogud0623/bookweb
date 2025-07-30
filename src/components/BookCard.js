import { Link } from 'react-router-dom';

function BookCard({ id, image, title, author, isCenter }) {
  return (
    <Link to={`/book/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        textAlign: 'center',
        transform: isCenter ? 'scale(1.00)' : 'scale(0.75)',
        transition: 'transform 0.2s',
        margin: '0 10px',
        cursor: 'pointer'
      }}>
        <div style={{
          width: '140px',
          height: '200px',
          overflow: 'hidden',
          borderRadius: '6px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
        <p style={{ 
          fontWeight: 700, 
          fontSize: '15px', 
          marginTop: '0.7rem',
          marginBottom: '0.2rem',
          textAlign: "left"
        }}>
          {title}
        </p>
        <p style={{ 
          fontSize: '15px', 
          color: '#3D3D3D', 
          margin: 0,
          textAlign : "left"
        }}>
          {author}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
