import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './Transparency.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ['Stablecoins, Cash & Short-Term Deposits'],
    datasets: [
    {
        label: 'Reserves Breakdown',
        data: [100], // 100% for the single category
        backgroundColor: ['#3985BC'],
        hoverBackgroundColor: ['#3985BC'],
        borderColor: ['#ffffff'], // Optional: white border for a cleaner look
        borderWidth: 1,
    },
    ],
};

const options = {
    plugins: {
    legend: {
        position: 'bottom', // Display the legend at the bottom
    },
    tooltip: {
        callbacks: {
        label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
    },
    },
};
  

const ERC20_ABI = [
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
];

const Transparency = () => {
  const [totalSupply, setTotalSupply] = useState(null);
  const provider = new ethers.JsonRpcProvider('https://ethereum.blockpi.network/v1/rpc/public');

  const tokenAddress = '0x752A1a0E8FDE8C77A24AB9c1AD10DAf03c90A940';

  useEffect(() => {
    const fetchTotalSupply = async () => {
      try {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const rawTotalSupply = await tokenContract.totalSupply();
        const decimals = await tokenContract.decimals();
        const adjustedTotalSupply = ethers.formatUnits(rawTotalSupply, decimals);
        setTotalSupply(adjustedTotalSupply);
      } catch (err) {
        console.log(`Failed to fetch total supply: ${err.message}`);
      }
    };
    fetchTotalSupply();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
        <h2>Transparency</h2>
        <div className="total-supply-container"> 
            <div>
                <p>Transparency is a cornerstone of BRC's design. Developed on public blockchains, BRC uses smart contracts to ensure interoperability with existing decentralized finance infrastructure. This open and accessible system enhances resilience to foreign influence and promotes trust. Multisig wallets for reserve management, regular audits, and stringent security protocols further ensure the integrity and transparency of BRC operations.</p>
            </div>
            <div className="total-supply">
                <h3>Real Time Metrics</h3>
                <h4>BRC Tokens in Circulation</h4>
                <p>
                    This data is provided in real time and verifiable on a 3rd party{' '} <a href={`https://etherscan.io/token/${tokenAddress}`} target="_blank" rel="noopener noreferrer"> block explorer</a>
                </p>
                {totalSupply !== null ? (
                    <div className="total-supply-text">BRC on Ethereum: {totalSupply}</div>
                ) : (
                    <p>Loading total supply...</p>
                )}
                <div className="total-supply-buttons">
                    <a href={`https://etherscan.io/token/${tokenAddress}`} target="_blank" rel="noopener noreferrer">
                        <button className="button-alt">DETAILS</button>
                    </a>

                    <a href={`https://etherscan.io/token/${tokenAddress}#balances`} target="_blank" rel="noopener noreferrer">
                        <button className="button-alt">BALANCES</button>
                    </a>

                    <a href={`https://etherscan.io/token/${tokenAddress}#tokenAnalytics`} target="_blank" rel="noopener noreferrer">
                        <button className="button-alt">ANALYTICS</button>
                    </a>
                </div>
            </div>
        </div>
        <h3>Reserves</h3>
        <p>BRC provides monthly attestations and detailed reports on reserve compositions. This ensures that BRC tokens are always backed by an equivalent value of BRICS national currencies. The reserves are held in the custody of leading financial institutions, designed to provide token holders with ready liquidity and confidence in the 1:1 backing of their assets.</p>
        <p><span className="report-date">August 2024</span> Report on the Consolidated Reserves: <a href="/reports/Consolidated-Reserves-August-2024.pdf" target="_blank" className="report-link">Consolidated-Reserves-August-2024.pdf</a></p>
        <h4>Reserve Composition</h4>
        <p>As of the last report the reserves break down is as follows:</p>
        <div className="pie-container">
            <Pie data={data} options={options} />
        </div>
        <h4>Commitment to Transparency</h4>
        <p>Since its inception, BRC is committed to maintaining the highest standards of transparency. This includes regular disclosures of reserve holdings, audit reports, and real-time financial metrics that provide insights into the currency's supply, backing and stability.</p>
    </div>
  );
};

export default Transparency;
