import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a
              href="https://github.com/shlokkvaishnav"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/shlokkvaishnav"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a
              href="mailto:shlokkvaishnav@gmail.com"
              className="footer-link"
            >
              Email
            </a>
          </div>
          <p className="footer-copy">
            © {currentYear} Shlok V Vaishnav
          </p>
        </div>
      </div>
    </footer>
  )
}
