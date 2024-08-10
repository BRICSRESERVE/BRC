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
        <p>The BRICS Reserve Currency (BRC) is a digital asset designed to enhance trade and economic integration within the BRICS economic bloc. BRC leverages cutting edge financial technology to create a decentralized, transparent, and secure medium of exchange. Unlike traditional currencies, BRC operates independently of any single nation's monetary policy, promoting economic sovereignty and reducing dependency on the US dollar.</p>
        <Calculator />  
        <h3>A Basket Of BRICS National Currencies</h3>
        <p>BRC is supported by reserves of the BRICS national currencies (BRL, CNY, INR, RUB, ZAR, AED). Authorized participants deposit local currency wire transfers to mint new BRC tokens. These funds are then converted into equally weighted amounts and invested in short-term government bonds from each BRICS nation. The exchange rate is dynamically determined based on the current value of each currency, ensuring a transparent and market-driven valuation process. Upon redemption the government bonds are liquidated and a wire payment or digital asset is sent out in the redeemers currency of choice.</p>
        <p>End users can swap the BRC token without registration for various other digital assets on leading decentralized exchanges.</p>
        <p>Price of the BRC token is calculated by dividing the value of the collateral reserves by the supply of tokens. This offers limited and diversified exposure to any single currency within the economic bloc.</p>
        <div className="image-container">
          <Explainer />
        </div>
      </div>
      <div className="section" id="cross-border-solution">
        <h2>Cross Border Solution</h2>
        <p>BRC offers a seamless cross border trading solution for settlements and remittances. By eliminating the need for currency conversion and lowering transaction costs, BRC facilitates efficient global trade. Businesses and individuals can use BRC to settle accounts and as a store of value, benefiting from its backing by a diversified basket of assets. This innovation not only simplifies international transactions but also fosters economic cooperation and integration among BRICS nations.</p>
          
        <div className="cross-container">
          <img src="/img/cross1.png" alt="settlements" className="cross-icon" />
          <div>
            <h3>Streamlined Settlements</h3>
            <p>With BRC, businesses can streamline their settlement processes. Traditional cross border transactions often involve multiple currency conversions and international banks, which can be costly and time consuming. BRC eliminates these inefficiencies by providing a unified digital currency that can be used directly between parties for settlements. This reduces the complexity of transactions, accelerates the settlement process, and cuts down on transaction fees, making international trade more accessible and cost effective.</p>
          </div>
        </div>
        <div className="cross-container">
          <img src="/img/cross2.png" alt="remittances" className="cross-icon" />
          <div>
            <h3>Remittances</h3>
            <p>For individuals, BRC offers a simple solution for remittances. Sending money across borders typically involves high fees and unfavorable exchange rates. BRC minimizes these costs by enabling direct transfers between users in different countries, bypassing the need for intermediary banks and currency exchanges. This makes it easier and cheaper for individuals to send and receive money internationally, benefiting families and businesses alike.</p>
          </div>
        </div>
        <div className="cross-container">
          <img src="/img/cross3.png" alt="enhanced trade efficiency" className="cross-icon" />
          <div>
            <h3>Enhanced Trade Efficiency</h3>
            <p>BRC enhances trade efficiency by providing a stable and reliable medium of exchange. Its backing by a diversified basket of BRICS national currencies ensures that BRC maintains its value, reducing the risks associated with individual currency fluctuations. This stability is particularly advantageous for businesses engaged in international trade, as it allows them to plan and execute transactions with greater confidence and predictability.</p>
            <p>By facilitating seamless cross-border transactions, BRC promotes greater economic integration among BRICS nations. The use of a common digital currency for trade reduces barriers and fosters closer economic ties between member countries. This integration supports the development of a more interconnected and collaborative economic bloc, enhancing the collective economic strength of BRICS countries.</p>
          </div>
        </div>
        <div className="cross-container">
          <img src="/img/cross4.png" alt="financial inclusion" className="cross-icon" />
          <div>
            <h3>Financial Inclusion</h3>
            <p>In many regions, access to traditional banking services is limited. BRC leverages public blockchain technology to provide a decentralized and accessible financial platform, enabling more people to participate in the global economy. This democratization of financial services helps bridge the gap between the unbanked population and mainstream economic activities, promoting broader economic growth and development.</p>
          </div>
        </div>
        <p>The use of modern financial technology ensures that all transactions with BRC are secure, transparent, and immutable. Every transaction is recorded on a public ledger, providing an auditable trail that enhances trust and accountability. This transparency is crucial for fostering a secure and trustworthy environment for cross-border trade and financial activities.</p>
        <p>By reducing reliance on foreign currencies and financial systems, BRC offers resilience, independence, and stability for global economies.</p>
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
