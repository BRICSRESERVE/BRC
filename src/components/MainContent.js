// components/MainContent.js
import React from 'react';
import './../App.css';
import './MainContent.css';
import FrontPage from './FrontPage';
import Calculator from './Calculator';
import Transparency from './Transparency';
import { ReactComponent as Explainer } from '../assets/explainer.svg';

const MainContent = () => {
  return (
    <main>
      <video autoPlay muted loop id="video-background" playsInline>
        <source src="/brc-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <FrontPage />
      <div className="section" id="what-is-brc">
        <p>The BRICS Reserve Currency (BRC) is a digital asset designed to enhance trade and economic integration within the BRICS economic bloc. BRC leverages cutting edge financial technology to create a decentralized, transparent, and secure medium of exchange. Unlike traditional currencies, BRC operates independently of any single nation's monetary policy, promoting financial sovereignty and monetary stability.</p>
        <Calculator />  
        <h3>A Basket Of BRICS National Currencies</h3>
        <p>The BRC is to BRICS what the ECU was to the Euro, but it's the full currency from the start. While the ECU paved the way for the Euro, the BRC, powered by blockchain, is a stable currency ready to drive BRICS economic integration today.</p>
        <p>BRC is supported by reserves of the BRICS national currencies (BRL, CNY, INR, RUB, ZAR, AED). Authorized participants deposit local currency wire transfers to mint new BRC tokens. These funds are then converted into equally weighted amounts and invested in short-term government bonds from each BRICS nation. The exchange rate is dynamically determined based on the current value of each currency, ensuring a transparent and market-driven valuation process. Upon redemption the government bonds are liquidated and a wire payment or digital asset is sent out in the redeemers currency of choice.</p>
        <p>End users can swap the BRC token without registration for various other digital assets on leading decentralized exchanges.</p>
        <p>Price of the BRC token is calculated by dividing the value of the collateral reserves by the supply of tokens. This offers limited and diversified exposure to any single currency within the economic bloc.</p>
        <div className="image-container">
          <Explainer />
        </div>
      </div>
      
      <div className="section" id="transparency">
        <Transparency />
      </div>
      <div className="section" id="partners">
        <h2>Partners</h2>
        <p>BRC's success is built on strong partnerships. Authorized participants include financial institutions and registered entities from around the world, contributing to the minting and redeeming processes. A governance team, with representatives from each BRICS nation, oversees BRC's operations to ensure alignment with member countries economic policies.</p>
        <div className="partner-buttons">
            <a href="/#/dashboard"><button>LOG IN</button></a>
            <a href="/#/register"><button className="button-alt">NEW PARTNERS</button></a>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
