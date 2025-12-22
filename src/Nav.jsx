import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/DECA-web-project/Home">
          DECA
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleNavbar}
          aria-controls="navbarNav" 
          aria-expanded={isOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/DECA-web-project/Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DECA-web-project/Home/Learn">
                Learn
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DECA-web-project/Home/Teach">
                Teach
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DECA-web-project/Home/Dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-danger" href="/DECA-web-project">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}