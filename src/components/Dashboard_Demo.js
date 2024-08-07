import React, { useState } from 'react';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import exchangeRates from './ExchangeRates';
import './../App.css';
import './Dashboard.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const Dashboard = () => {
  const [balance, setBalance] = useState(100000);
  const [transactionModal, setTransactionModal] = useState(null);
  const [mintModal, setMintModal] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [iban, setIban] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [swiftCode, setSwiftCode] = useState('');
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);

  const bankDetails = {
    BRL: {
      country: 'Brazil',
      bankName: 'Banco do Brasil',
      accountNumber: '123456789',
      swiftCode: 'BRASBRRJBSA',
      iban: 'BR18000000000012345678901C2',
      address: 'Av. Paulista, 1000, São Paulo, SP, Brazil'
    },
    CNY: {
      country: 'China',
      bankName: 'Industrial and Commercial Bank of China',
      accountNumber: '987654321',
      swiftCode: 'ICBKCNBJ',
      iban: 'CN18000000000098765432101C2',
      address: 'No.55 Fuxingmennei Avenue, Xicheng District, Beijing, China'
    },
    INR: {
      country: 'India',
      bankName: 'State Bank of India',
      accountNumber: '1122334455',
      swiftCode: 'SBININBB',
      iban: 'IN180000000000112233445501C2',
      address: 'Mumbai Main Branch, Mumbai, Maharashtra, India'
    },
    RUB: {
      country: 'Russia',
      bankName: 'Sberbank',
      accountNumber: '5566778899',
      swiftCode: 'SABRRUMM',
      iban: 'RU18000000000055667788901C2',
      address: '19 Vavilova St., Moscow, Russia'
    },
    ZAR: {
      country: 'South Africa',
      bankName: 'First National Bank',
      accountNumber: '6655443322',
      swiftCode: 'FIRNZAJJ',
      iban: 'ZA180000000000665544332201C2',
      address: '3rd Floor, 1 First Place, Bank City, Johannesburg, South Africa'
    }
  };
  

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setCurrency(currency);
    setSelectedBankDetails(bankDetails[currency]);
  };

  const depositAddress = "0xEf01C743Db898B57c9D4b691Af27495d49119b89";
  const tokenAddress = '0xf558dA02A1E9176aDDef2A82304F5867cbc61dE6';
  const tokenABI = [{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "value","type": "uint256"}],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "burnFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "allowance","type": "uint256"},{"internalType": "uint256","name": "needed","type": "uint256"}],"name": "ERC20InsufficientAllowance","type": "error"},{"inputs": [{"internalType": "address","name": "sender","type": "address"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "uint256","name": "needed","type": "uint256"}],"name": "ERC20InsufficientBalance","type": "error"},{"inputs": [{"internalType": "address","name": "approver","type": "address"}],"name": "ERC20InvalidApprover","type": "error"},{"inputs": [{"internalType": "address","name": "receiver","type": "address"}],"name": "ERC20InvalidReceiver","type": "error"},{"inputs": [{"internalType": "address","name": "sender","type": "address"}],"name": "ERC20InvalidSender","type": "error"},{"inputs": [{"internalType": "address","name": "spender","type": "address"}],"name": "ERC20InvalidSpender","type": "error"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "OwnableInvalidOwner","type": "error"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "OwnableUnauthorizedAccount","type": "error"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}];

  const transactionHistory = [
    {
      id: 1,
      time: '2024-07-01 12:30',
      address: '0xRecipientAddress1',
      notes: 'Payment for services',
    },
    {
      id: 2,
      time: '2024-07-02 14:00',
      address: '0xRecipientAddress2',
      notes: 'Refund',
    },
  ];

  const handleMint = () => {
    const brcAmount = amount / exchangeRates[currency];
    setBalance(balance + brcAmount);
    setMintModal(false);
  };

  const handleRedeem = () => {
    setBalance(balance - amount);
    setRedeemModal(false);
  };

  /*
  const sendBRC = async (receiverAddress, amount) => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, tokenABI, signer);
      await contract.transfer(receiverAddress, ethers.parseUnits(amount.toString(), 18));
    }
  };
  */

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1>Demo Dashboard</h1>
      <h2>Balance: {balance.toLocaleString()} BRC</h2>
      
      <h3>Transaction History</h3>
      <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Time</th>
                <th>Address</th>
                <th>Notes</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {transactionHistory.map(tx => (
                <tr key={tx.id}>
                <td>{tx.time}</td>
                <td>{tx.address}</td>
                <td>{tx.notes}</td>
                <td>
                    <button onClick={() => setTransactionModal(tx)}>View</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
      <button onClick={() => setMintModal(true)}>Mint</button>
      <button onClick={() => setRedeemModal(true)}>Redeem</button>
      <button onClick={() => window.open("https://app.uniswap.org/", "_blank")}>Buy On Exchange</button>
      <button onClick={() => { alert("Wallet not connected") }}>Send BRC</button>
      <button onClick={() => { alert("Wallet not connected") }}>Receive BRC</button>

      {transactionModal && (
        <Modal isOpen={!!transactionModal} onRequestClose={() => setTransactionModal(null)}>
          <div className='modal-container'>
            <h3>Transaction Details</h3>
            <p>Time: {transactionModal.time}</p>
            <p>Address: {transactionModal.address}</p>
            <p>Notes: {transactionModal.notes}</p>
            <button onClick={() => setTransactionModal(null)}>Close</button>
          </div>
        </Modal>
      )}

      {mintModal && (
        <Modal isOpen={mintModal} onRequestClose={() => setMintModal(false)}>
          <div className='modal-container'>
            <div>
                <h3>Mint BRC</h3>
                <select value={currency} onChange={handleCurrencyChange}>
                <option value="">Select Currency</option>
                {Object.keys(exchangeRates).map(cur => (
                    <option key={cur} value={cur}>{cur}</option>
                ))}
                </select>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <p>BRC Purchase Amount: {(amount / exchangeRates[currency]).toFixed(2)}</p>
            </div>
            {selectedBankDetails && (
                <div id="bank-details" style={{ marginTop: '20px' }}>
                <p className="bold">Bank Details for {selectedBankDetails.country}</p>
                <p><strong>Bank Name:</strong> {selectedBankDetails.bankName}</p>
                <p><strong>IBAN:</strong> {selectedBankDetails.iban}</p>
                <p><strong>Account Number:</strong> {selectedBankDetails.accountNumber}</p>
                <p><strong>SWIFT Code:</strong> {selectedBankDetails.swiftCode}</p>
                <p><strong>Address:</strong> {selectedBankDetails.address}</p>
                </div>
            )}
            <div>
                <button onClick={handleMint}>Confirm Payment Sent</button>
                <button onClick={() => setMintModal(false)}>Cancel</button>
            </div>
            <br />
            <div className="small">Please note that transactions may take up to one working day to process</div>
          </div>
        </Modal>
      )}

{redeemModal && (
        <Modal isOpen={redeemModal} onRequestClose={() => setRedeemModal(false)}>
          <div className='modal-container'>
            <h3>Redeem BRC</h3>
            <div>
                <input
                type="number"
                placeholder="Enter BRC Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                /> BRC
            </div>
            <div>
                Withdrawal Currency: <select value={currency} onChange={handleCurrencyChange}>
              <option value="">Select Currency</option>
              {Object.keys(exchangeRates).map(cur => (
                <option key={cur} value={cur}>{cur}</option>
              ))}
            </select>
            </div>
            <div>
                <input
                type="text"
                placeholder="Enter IBAN"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                />
                <br />
                <input
                type="text"
                placeholder="Enter Account Holder Name"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                />
                <br />
                <input
                type="text"
                placeholder="Enter SWIFT Code"
                value={swiftCode}
                onChange={(e) => setSwiftCode(e.target.value)}
                />
            </div>
            <div>
                {currency && (
                <p>Withdrawal Amount: {(amount * exchangeRates[currency]).toFixed(2)} {currency}</p>
                )} 
            </div>
            <div>
              <p>Send your BRC tokens to the following Ethereum address:</p>
              <p><strong>{depositAddress}</strong></p>
            </div>
            <div>
              <button onClick={handleRedeem}>Funds Sent</button>
              <button onClick={() => setRedeemModal(false)}>Cancel</button>
            </div>
            <br />
            <div className="small">Please note that transactions may take up to one working day to process</div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
