import img from '@assets/gif/error.gif';

function ErrorBoundary() {
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        Ошибка 404
      </div>
      <img
        style={{
          display: 'block',
          width: '250px',
          height: '250px',
          objectFit: 'contain',
          margin: '0 auto',
        }}
        src={img}
        alt="Error"
      />
    </>
  );
}

export default ErrorBoundary;
