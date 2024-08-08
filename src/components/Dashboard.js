import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import Modal from 'react-modal';
import { createClient } from '@supabase/supabase-js';
import QRCode from 'qrcode.react';
import getExchangeRates from './ExchangeRates';
import './../App.css';
import './Dashboard.css';

const supabase = createClient('https://pzkdbludanipokuucwtj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6a2RibHVkYW5pcG9rdXVjd3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3ODAwNTcsImV4cCI6MjAzODM1NjA1N30.QbVYgsi8nh9519HGup_53-sz3LpgplH29qh8Kh4nFys');

Modal.setAppElement('#root');

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactionModal, setTransactionModal] = useState(null);
  const [mintModal, setMintModal] = useState(false);
  const [mintedModal, setMintedModal] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('');
  const [iban, setIban] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [bic, setBIC] = useState('');
  const [withdrawalAddress, setWithdrawalAddress] = useState('');
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [sendModal, setSendModal] = useState(false);
  const [receiveModal, setReceiveModal] = useState(false);
  const [swapModal, setSwapModal] = useState(false);
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [baseRates, setBaseRates] = useState(null);
  const [quoteContent, setQuoteContent] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchRates = async () => {
      const forexRates = await getExchangeRates();
      setBaseRates(forexRates);
    };
    fetchRates();
  }, []);

  const depositAddress = "0x1BcF3d7C1A5BD787dFdCE8835576953A7A5d1Fb8";
  const tokenAddress = '0x752A1a0E8FDE8C77A24AB9c1AD10DAf03c90A940';
  const tokenABI = [{"inputs": [],"name": "ECDSAInvalidSignature","type": "error"},{"inputs": [{"internalType": "uint256","name": "length","type": "uint256"}],"name": "ECDSAInvalidSignatureLength","type": "error"},{"inputs": [{"internalType": "bytes32","name": "s","type": "bytes32"}],"name": "ECDSAInvalidSignatureS","type": "error"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "allowance","type": "uint256"},{"internalType": "uint256","name": "needed","type": "uint256"}],"name": "ERC20InsufficientAllowance","type": "error"},{"inputs": [{"internalType": "address","name": "sender","type": "address"},{"internalType": "uint256","name": "balance","type": "uint256"},{"internalType": "uint256","name": "needed","type": "uint256"}],"name": "ERC20InsufficientBalance","type": "error"},{"inputs": [{"internalType": "address","name": "approver","type": "address"}],"name": "ERC20InvalidApprover","type": "error"},{"inputs": [{"internalType": "address","name": "receiver","type": "address"}],"name": "ERC20InvalidReceiver","type": "error"},{"inputs": [{"internalType": "address","name": "sender","type": "address"}],"name": "ERC20InvalidSender","type": "error"},{"inputs": [{"internalType": "address","name": "spender","type": "address"}],"name": "ERC20InvalidSpender","type": "error"},{"inputs": [{"internalType": "uint256","name": "deadline","type": "uint256"}],"name": "ERC2612ExpiredSignature","type": "error"},{"inputs": [{"internalType": "address","name": "signer","type": "address"},{"internalType": "address","name": "owner","type": "address"}],"name": "ERC2612InvalidSigner","type": "error"},{"inputs": [{"internalType": "address","name": "account","type": "address"},{"internalType": "uint256","name": "currentNonce","type": "uint256"}],"name": "InvalidAccountNonce","type": "error"},{"inputs": [],"name": "InvalidShortString","type": "error"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "OwnableInvalidOwner","type": "error"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "OwnableUnauthorizedAccount","type": "error"},{"inputs": [{"internalType": "string","name": "str","type": "string"}],"name": "StringTooLong","type": "error"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [],"name": "EIP712DomainChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address","name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "value","type": "uint256"}],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "burnFrom","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"},{"internalType": "uint256","name": "deadline","type": "uint256"},{"internalType": "uint8","name": "v","type": "uint8"},{"internalType": "bytes32","name": "r","type": "bytes32"},{"internalType": "bytes32","name": "s","type": "bytes32"}],"name": "permit","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "from","type": "address"},{"internalType": "address","name": "to","type": "address"},{"internalType": "uint256","name": "value","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{"internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "DOMAIN_SEPARATOR","outputs": [{"internalType": "bytes32","name": "","type": "bytes32"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "eip712Domain","outputs": [{"internalType": "bytes1","name": "fields","type": "bytes1"},{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "uint256","name": "chainId","type": "uint256"},{"internalType": "address","name": "verifyingContract","type": "address"},{"internalType": "bytes32","name": "salt","type": "bytes32"},{"internalType": "uint256[]","name": "extensions","type": "uint256[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"}],"name": "nonces","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"}];

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 1n) alert('Please connect metamask to Ethereum mainnet');
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        fetchBalance(address, provider);
        fetchTransactionHistory(address, provider);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.error('Metamask not detected');
    }
  };

  const logOut = async () => {
    setWalletAddress(null);
    window.location = '';
  }

  const fetchBalance = async (address, provider) => {
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
    const balance = await contract.balanceOf(address);
    setBalance(ethers.formatUnits(balance, 18));
  };

  const fetchTransactionHistory = async (address, provider) => {
    const contract = new ethers.Contract(tokenAddress, tokenABI, provider);
    const filter = contract.filters.Transfer(address, null);
    const sentEvents = await contract.queryFilter(filter);
    const receivedFilter = contract.filters.Transfer(null, address);
    const receivedEvents = await contract.queryFilter(receivedFilter);
    
    const allEvents = [...sentEvents, ...receivedEvents].sort((a, b) => b.blockNumber - a.blockNumber);
    
    const history = await Promise.all(allEvents.map(async (event) => {
      const block = await event.getBlock();
      return {
        id: event.transactionHash,
        time: new Date(block.timestamp * 1000).toLocaleString(),
        address: event.args[0] === address ? event.args[1] : event.args[0],
        notes: event.args[0] === address ? 'Sent' : 'Received',
        amount: ethers.formatUnits(event.args[2], 18),
      };
    }));

    setTransactionHistory(history);
  };

  const handleSendBRC = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        if (network.chainId !== 1n) alert('Please connect metamask to Ethereum mainnet');
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(tokenAddress, tokenABI, signer);
        const amountInWei = ethers.parseUnits(sendAmount, 18);
        const tx = await contract.transfer(recipientAddress, amountInWei);
        await tx.wait();
        alert('Transaction sent successfully!');
        setSendModal(false);
        fetchBalance(walletAddress, provider);
        fetchTransactionHistory(walletAddress, provider);
      } catch (error) {
        console.error('Failed to send BRC:', error);
        alert('Failed to send BRC. Please try again.');
      }
    } else {
      alert('Unfortunately no browser wallet found, try installing Metamask from https://metamask.io')
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Address copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const bankDetails = {
    BRL: {
      country: 'Brazil',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    },
    CNY: {
      country: 'China',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    },
    INR: {
      country: 'India',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    },
    RUB: {
      country: 'Russia',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    },
    ZAR: {
      country: 'South Africa',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    }, AED: {
      country: 'United Arab Emirates',
      bankName: 'WIO BANK P.J.S.C.',
      accountName: 'BRC Mint Authority',
      bic: 'WIOBAEADXXX',
      iban: 'AE560860000009515057892',
      address: 'ETIHAD AIRWAYS CENTRE, FLOOR 5, AL RAHA BEACH, AL MUNEERA'
    }
  };

  const handleCurrencyChange = (event) => {
    const currency = event.target.value;
    setCurrency(currency);
    setSelectedBankDetails(bankDetails[currency]);
  };

  const handleMint = () => {
    const brcAmount = amount / baseRates[currency];
    setMintModal(false);
    setMintedModal(true);
  };

  const RedeemModal = ({ isOpen, onRequestClose, depositAddress, baseRates }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [iban, setIban] = useState('');
    const [accountHolder, setAccountHolder] = useState('');
    const [bic, setBIC] = useState('');

    const handleCurrencyChange = (e) => {
      setCurrency(e.target.value);
    };
  
    const handleRedeem = async () => {
      let signer
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const network = await provider.getNetwork();
          if (network.chainId !== 1n) alert('Please connect metamask to Ethereum mainnet');  
          signer = await provider.getSigner();
          const contract = new ethers.Contract(tokenAddress, tokenABI, signer);
          const amountInWei = ethers.parseUnits(amount, 18);
          console.log(depositAddress, amountInWei)
          const tx = await contract.transfer(depositAddress, amountInWei);
          await tx.wait();
          // After successful transaction, update the database
          const { data, error } = await supabase
            .from('BRC REDEMPTIONS')
            .insert([
              {
                brc_amount: amount,
                currency: currency,
                currency_amount: (amount * baseRates[currency]).toFixed(2),
                iban: iban,
                account_name: accountHolder,
                bic: bic,
                eth_wallet: await signer.getAddress()
              }
            ]);

          if (error) throw error;
          alert('Transaction sent successfully!');
          setRedeemModal(false);
          fetchBalance(walletAddress, provider);
          fetchTransactionHistory(walletAddress, provider);
        } catch (error) {
          console.error('Failed to send BRC:', error);
          alert('Failed to send BRC. Please try again.');
        }
      } else {
        alert('Unfortunately no browser wallet found, try installing Metamask from https://metamask.io')
      }
      onRequestClose();
    };

    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className='modal-container'>
          <h3>Redeem BRC</h3>
          <div>
            <span class="input-currency-right">
              <input
                type="number"
                placeholder="Enter BRC Amount"
                value={amount}
                step=".000001"
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
          </div>
          <div>
            Withdrawal Currency: <select value={currency} onChange={handleCurrencyChange}>
              <option value="">Select Currency</option>
              {Object.keys(baseRates)
              .filter(cur => ['CNY', 'RUB', 'INR', 'ZAR', 'BRL', 'AED'].includes(cur))
              .map(cur => (
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
              placeholder="Enter BIC Code"
              value={bic}
              onChange={(e) => setBIC(e.target.value)}
            />
          </div>
          <div>
            {currency && (
              <p>Withdrawal Amount: {(amount * baseRates[currency]).toFixed(2)} {currency}</p>
            )}
          </div>
          <div>
            <p>Sending your BRC tokens to the deposit address:</p>
            <p><strong>{depositAddress}</strong></p>
          </div>
          <div>
            <button onClick={handleRedeem}>Send BRC</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
          <br />
          <div className="small">Please note that transactions may take up to one working day to process</div>
        </div>
      </Modal>
    );
  };

  const SwapModal = ({ isOpen, onRequestClose, depositAddress, baseRates }) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [withdrawalAddress, setWithdrawalAddress] = useState('');
    const [quoteContent, setQuoteContent] = useState('');
    const timeoutRef = useRef(null);
  
    useEffect(() => {
      if (!isOpen) {
        clearTimeout(timeoutRef.current);
      }
    }, [isOpen]);
  
    const handleCurrencyChange = (e) => {
      setCurrency(e.target.value);
    };
  
    const handleSwap = async () => {
      clearTimeout(timeoutRef.current);
      let signer;
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const network = await provider.getNetwork();
          if (network.chainId !== 1n) alert('Please connect metamask to Ethereum mainnet');  
          signer = await provider.getSigner();
          const contract = new ethers.Contract(tokenAddress, tokenABI, signer);
          const amountInWei = ethers.parseUnits(amount, 18);
          const tx = await contract.transfer(depositAddress, amountInWei);
          await tx.wait();
          alert('Transaction sent successfully!');
          onRequestClose();
        } catch (error) {
          console.error('Failed to send BRC:', error);
          console.log(error);
          alert('Failed to send BRC. Please try again.');
        }
      } else {
        alert('Unfortunately no browser wallet found, try installing Metamask from https://metamask.io');
      }
  
      // After successful transaction, update the database
      const { data, error } = await supabase
        .from('BRC REDEMPTIONS')
        .insert([
          {
            brc_amount: amount,
            currency: currency,
            currency_amount: (amount * baseRates[currency]).toFixed(8),
            withdrawal_address: withdrawalAddress,
            eth_wallet: await signer.getAddress(),
          },
        ]);
  
      if (error) throw error;
  
      onRequestClose();
    };
  
    const handleQuote = async () => {
      if (currency === '' || amount === '') {
        alert('Please enter an amount and currency');
        return;
      }
      const newBaseRates = await getExchangeRates();
      baseRates = newBaseRates;
  
      const handleReject = () => {
        clearTimeout(timeoutRef.current);
        setQuoteContent('');
      };
  
      let lookupCurrency = currency;
      if (lookupCurrency === 'USDC' || lookupCurrency === 'USDT') lookupCurrency = 'USD';
      const quoteAmount = amount * baseRates[lookupCurrency];
  
      setQuoteContent(
        <div>
          <h4>Quotation</h4>
          <p>You have 60 seconds to accept or reject this quotation</p>
          <p>Swapping {amount} BRC for:</p>
          <h4>{quoteAmount} {currency}</h4>
          <button onClick={handleSwap}>Accept</button>
          <button onClick={handleReject}>Reject</button>
        </div>
      );
  
      timeoutRef.current = setTimeout(() => {
        setQuoteContent('');
      }, 60000);
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <div className="modal-container">
          <h3>Swap BRC For Digital Assets</h3>
          <div>
            <span class="input-currency-right">
              <input
                type="number"
                placeholder="Enter BRC Amount"
                value={amount}
                step=".000001"
                onChange={(e) => setAmount(e.target.value)}
              />
            </span>
          </div>
          <div>
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="">Select Digital Asset</option>
              <option key="BTC" value="BTC">BTC</option>
              <option key="ETH" value="ETH">ETH</option>
              <option key="USDC" value="USDC">USDC</option>
              <option key="USDT" value="USDT">USDT</option>
            </select>
          </div>
          <br />
          <div>
            Enter a withdrawal address to receive funds:<br />
            <input
              type="text"
              value={withdrawalAddress}
              placeholder="0x..."
              onChange={(e) => setWithdrawalAddress(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleQuote}>Request Quote</button>
            <button onClick={onRequestClose}>Cancel</button>
          </div>
          <div className="quote-container">{quoteContent}</div>
          <br />
          <div className="small">Please note that transactions may take up to one working day to process</div>
        </div>
      </Modal>
    );
  };  

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1>BRC Dashboard</h1>
      <h4>Wallet Address: {walletAddress}</h4>
      <h4>Balance: {parseFloat(balance).toFixed(6)} BRC</h4>
      
      <h3>Transaction History</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionHistory.map(tx => (
              <tr key={tx.id}>
                <td>{tx.time}</td>
                <td>{tx.address}</td>
                <td>{tx.notes}</td>
                <td>{tx.amount} BRC</td>
                <td>
                  <button onClick={() => window.open(`https://sepolia.etherscan.io/tx/${tx.id}`, '_blank')}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => setMintModal(true)}>Mint</button>
      <button onClick={() => setRedeemModal(true)}>Redeem</button>
      <button onClick={() => window.open("https://app.uniswap.org/#/swap?chain=sepolia&inputCurrency=eth&outputCurrency="+tokenAddress, "_blank")}>Exchange</button>
      <button onClick={() => setSendModal(true)}>Send BRC</button>
      <button onClick={() => setReceiveModal(true)}>Receive BRC</button>
      <button onClick={() => setSwapModal(true)}>Swap BRC</button>
      <button onClick={() => logOut()}>Log Out</button>
      
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
                {Object.keys(baseRates)
                .filter(cur => ['CNY', 'RUB', 'INR', 'ZAR', 'BRL', 'AED'].includes(cur))
                .map(cur => (
                    <option key={cur} value={cur}>{cur}</option>
                ))}
                </select>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <p>BRC Purchase Amount: {(amount / baseRates[currency]).toFixed(2)}</p>
            </div>
            <p>Send {amount} {currency} or equivalent to:</p>
            {selectedBankDetails && (
                <div id="bank-details" style={{ marginTop: '20px' }}>
                <p className="bold">Bank Details for {selectedBankDetails.country}</p>
                <p><strong>Bank Name:</strong> {selectedBankDetails.bankName}</p>
                <p><strong>IBAN:</strong> {selectedBankDetails.iban}</p>
                <p><strong>BIC Code:</strong> {selectedBankDetails.bic}</p>
                <p><strong>Bank Address:</strong> {selectedBankDetails.address}</p>
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

     {mintedModal && (
        <Modal isOpen={mintedModal} onRequestClose={() => setMintedModal(false)}>
          <div className='modal-container'>
            <div>
                <h3>Confirmation</h3>
                <p>BRC Purchase Amount: {(amount / baseRates[currency]).toFixed(2)}</p>
                <p>Status: Pending receipt of funds</p>
                <button onClick={() => setMintedModal(false)}>Close</button>
            </div>
            <br />
            <div className="small">Please note that transactions may take up to one working day to process</div>
          </div>
        </Modal>
      )}

      {sendModal && (
        <Modal isOpen={sendModal} onRequestClose={() => setSendModal(false)}>
          <div className='modal-container'>
            <h3>Send BRC</h3>
            <div>
              <input
                type="text"
                placeholder="Recipient Address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Amount"
                value={sendAmount}
                step=".000001"
                onChange={(e) => setSendAmount(e.target.value)}
              />
            </div>
            <div>
              <button onClick={handleSendBRC}>Send</button>
              <button onClick={() => setSendModal(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}

      {receiveModal && (
        <Modal isOpen={receiveModal} onRequestClose={() => setReceiveModal(false)}>
          <div className='modal-container receive-modal'>
            <h3>Receive BRC</h3>
            <div className="qr-container">
              <QRCode value={walletAddress} size={200} />
            </div>
            <div className="address-container">
              <p>{walletAddress}</p>
              <button onClick={() => copyToClipboard(walletAddress)}>Copy</button>
            </div>
            <button onClick={() => setReceiveModal(false)}>Close</button>
          </div>
        </Modal>
      )}

      {swapModal && (
        <SwapModal
          isOpen={swapModal}
          onRequestClose={() => setSwapModal(false)}
          depositAddress={depositAddress}
          baseRates={baseRates}
        />
      )}


      {redeemModal && (
        <RedeemModal
          isOpen={redeemModal}
          onRequestClose={() => setRedeemModal(false)}
          depositAddress={depositAddress}
          baseRates={baseRates}
        />
      )}
    </div>
  );
};

export default Dashboard;