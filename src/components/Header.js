// components/Header.js
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { ReactComponent as Logo } from '../assets/brc.svg';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const BRCLogo = () => {
    return <Logo width="50" height="50" />;
  };

  return (
    <header>
      <a href="/">
        <div className="logo">
          <BRCLogo />
          <span>
              <div>BRICS Reserve Currency</div>
              <div className="domain">brazil russia india china south africa</div>
          </span>
          
        </div>
      </a>
      <nav className={isOpen ? 'open' : ''}>
        <ul>
          <li><Link to="/#what-is-brc" smooth={true} duration={500} onClick={toggleMenu}>What Is BRC?</Link></li>
          <li><Link to="/#transparency" smooth={true} duration={500} onClick={toggleMenu}>Transparency</Link></li>
          <li><a href="/BGT-Tokenomics.pdf" target="_blank">BGT</a></li>
          <li><Link to="/#partners" smooth={true} duration={500} onClick={toggleMenu}>Partners</Link></li>
        </ul>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
