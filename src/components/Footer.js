// src/Footer.js
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Footer.css';
import { ReactComponent as Logo } from '../assets/brc.svg';

const BRCLogo = () => {
  return <Logo width="50" height="50" />;
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <BRCLogo />
          <div className="footer-logo-text">BRICS RESERVE CURRENCY</div>
          <div className="footer-logo-tagline">🌐 Global Shared Digital Asset</div>
        </div>
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/#what-is-brc" smooth={true} duration={500}>What Is BRC?</Link></li>
              <li><Link to="/cross-border-solution" smooth={true} duration={500}>Cross Border Solution</Link></li>
              <li><Link to="/#transparency" smooth={true} duration={500}>Transparency</Link></li>
              <li><Link to="/#partners" smooth={true} duration={500}>Partners</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="/BRC-WhitePaper.pdf" target="_blank">Whitepaper</a></li>
              <li><a href="/BGT-Tokenomics.pdf" target="_blank">BGT Tokenomics</a></li>
              <li><a href="https://github.com/bricsreserve/brc">Github</a></li>
              <li><a href="mailto:bricsreservecurrency@proton.me">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <p className="footer-copyright">©2024 BRICS Reserve Currency. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
