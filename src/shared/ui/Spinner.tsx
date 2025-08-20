import styles from '@styles/spinner.module.css';

function Spinner() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      style={{ margin: '0 auto', background: 'none', display: 'block' }}
      width="80px"
      height="80px"
      viewBox="0 0 150 150"
      aria-label="Loading..."
      className={styles.loader__svg}
    >
      <g>
        <path
          d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z"
          fill="currentColor"
          className={styles.loader__path}
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 75 75"
          to="360 75 75"
          dur="1.8s"
          repeatCount="indefinite"
        ></animateTransform>
      </g>
    </svg>
  );
}

export default Spinner;
