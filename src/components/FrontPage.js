import React from 'react';
import Typewriter from 'typewriter-effect';
import './FrontPage.css';


const FrontPage = () => {
  return (
    <div className="container hero-image">

      <div className="text-container">
        <Typewriter
          options={{
            delay: 50,
            autoStart: true,
            loop: true,
          }}
          onInit={(typewriter) => {
            typewriter.typeString('<span class="bold">BRC</span> The cross border payment solution')
            .pauseFor(3000)
            .deleteAll()
            typewriter.typeString('<span class="bold">BRC</span> Reducing reliance on the USD')
            .pauseFor(3000)
            .deleteAll()
            typewriter.typeString('<span class="bold">BRC</span> Shared digital asset available globally')
            .pauseFor(3000)
            .deleteAll()
            typewriter.typeString('<span class="bold">BRC</span> Enabling the future of money today')
            .pauseFor(3000)
            .deleteAll()
            .start();
        }}
        />
        <div className="cta-buttons">
          <a href="/#/dashboard"><button>LOG IN</button></a>
          <a href="/#/register"><button className="button-alt">NEW PARTNERS</button></a>
        </div>
      </div>  
    </div>
  );
}

export default FrontPage;
