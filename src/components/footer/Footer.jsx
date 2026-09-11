import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footerContent">
        <div className="footerLeft">
          <p className="footerText">
            Données propulsées par l'API officielle{' '}
            <a
              href="https://tcgdex.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="footerLink"
            >
              TCGdex
            </a>
          </p>
        </div>
        <div className="footerRight">
          <p className="footerCredits">
            Projet ReactDex • Oujid Karim &amp; Descorsiers Nicolas
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;