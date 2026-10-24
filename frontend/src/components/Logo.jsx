const ietLogo = '/assets/shared/iet-bit-mesra.svg';

function Logo() {
  return (
    <a className="logo" href="/" aria-label="IET Bit Mesra home">
      <span className="logo-badge">
        <img src={ietLogo} alt="IET Bit Mesra" />
      </span>
    </a>
  );
}

export default Logo;
