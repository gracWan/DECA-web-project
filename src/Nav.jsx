import { useState } from 'react';
import logo from './img/Logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
        }
        
        .navbar {
          background-color: #f8f9fa;
          box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
          padding: 1rem;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        
        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 100%;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .navbar-brand {
          font-size: 1.25rem;
          font-weight: 700;
          color: #000;
          text-decoration: none;
        }
        
        .navbar-toggler {
          display: none;
          background: none;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.25rem 0.75rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        
        .navbar-toggler-icon {
          display: inline-block;
          width: 1.5em;
          height: 1.5em;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
        }
        
        .navbar-nav {
          display: flex;
          flex-direction: row;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0;
          align-items: center;
        }
        
        .nav-link {
          color: rgba(0,0,0,0.55);
          text-decoration: none;
          padding: 0.5rem 1rem;
          transition: color 0.15s ease-in-out;
        }
        
        .nav-link:hover {
          color: rgba(0,0,0,0.7);
        }
        
        .nav-link.active {
          color: rgba(0,0,0,0.9);
          font-weight: 500;
        }
        
        .cart-icon {
          font-size: 1.25rem;
        }
        
        @media (max-width: 768px) {
          .navbar-toggler {
            display: block;
          }
          
          .navbar-collapse {
            display: ${isOpen ? 'block' : 'none'};
            width: 100%;
          }
          
          .navbar-nav {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 1rem;
          }
          
          .navbar-container {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar-container">
          <a className="navbar-brand" href="/DECA-web-project/Home">
            <img src={logo} style={{ height: '45px' }}/>
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
          <div className="navbar-collapse">
            <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/DECA-web-project/Home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DECA-web-project/Home/Learn">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/DECA-web-project/Home/Teach">
                Store
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link cart-icon" href="/DECA-web-project/Home/Cart">
                🛒
              </a>
            </li>
          </ul>
          </div>
        </div>
      </nav>
    </>
  );
}