import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './../App.css';
import './Calculator.css';
import { ReactComponent as BRCLogo } from '../assets/brc.svg';
import { ReactComponent as BrazilFlag } from '../assets/brazil.svg';
import { ReactComponent as RussiaFlag } from '../assets/russia.svg';
import { ReactComponent as IndiaFlag } from '../assets/india.svg';
import { ReactComponent as ChinaFlag } from '../assets/china.svg';
import { ReactComponent as SouthAfricaFlag } from '../assets/southafrica.svg';
import { ReactComponent as UAEFlag } from '../assets/uae.svg';
import { ReactComponent as USAFlag } from '../assets/usa.svg';
import getExchangeRates from './ExchangeRates';

const BRCExchangeCalculator = () => {
  const [baseRates, setBaseRates] = useState(null);
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('BRC');
  const [toCurrency, setToCurrency] = useState('CNY');
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('calculator');

  useEffect(() => {
    const fetchRates = async () => {
      const forexRates = await getExchangeRates();
      setBaseRates(forexRates);
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (baseRates) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, baseRates]);

  const currencies = [
    { code: 'BRC', name: 'BRICS Reserve Currency', image: BRCLogo },
    { code: 'CNY', name: 'Chinese Yuan', image: ChinaFlag },
    { code: 'RUB', name: 'Russian Ruble', image: RussiaFlag },
    { code: 'INR', name: 'Indian Rupee', image: IndiaFlag },
    { code: 'ZAR', name: 'South African Rand', image: SouthAfricaFlag },
    { code: 'BRL', name: 'Brazilian Real', image: BrazilFlag },
    { code: 'AED', name: 'UAE Dirham', image: UAEFlag },
    { code: 'USD', name: 'US Dollar', image: USAFlag },
  ];

  const calculateAllRates = () => {
    const rates = {};
    currencies.forEach(fromCurrency => {
      rates[fromCurrency.code] = {};
      currencies.forEach(toCurrency => {
        if (fromCurrency.code === toCurrency.code) {
          rates[fromCurrency.code][toCurrency.code] = 1;
        } else {
          rates[fromCurrency.code][toCurrency.code] = baseRates[toCurrency.code] / baseRates[fromCurrency.code];
        }
      });
    });
    return rates;
  };

  const exchangeRates = baseRates ? calculateAllRates() : {};

  const formatNumber = (num) => {
    const parts = num.toFixed(4).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parseFloat(parts[1]) === 0) {
      return parts[0];
    }
    return parts.join('.');
  };

  const convertCurrency = () => {
    const rate = exchangeRates[fromCurrency][toCurrency];
    const convertedAmount = parseFloat(amount) * rate;
    setResult(formatNumber(convertedAmount));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setAmount(result);
    setResult(amount);
  };

  const renderCurrencySymbol = (CurrencyComponent) => {
    return <CurrencyComponent className="currency-icon" />;
  };

  if (!baseRates) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calculator-container">
      <Tabs>
        <TabList>
          <Tab>Calculator</Tab>
          <Tab>Exchange Rates</Tab>
        </TabList>

        <TabPanel>
          <div className="calculator">
            <div className="input-group">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
              <div className="select-wrapper">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
                {renderCurrencySymbol(currencies.find(c => c.code === fromCurrency).image)}
              </div>
            </div>
            <div className="input-group">
              <button className="swap-button" onClick={handleSwap}>↔️</button>
            </div>
            <div className="input-group">
              <input type="text" value={result} readOnly />
              <div className="select-wrapper">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
                {renderCurrencySymbol(currencies.find(c => c.code === toCurrency).image)}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="rates-table">
            <table>
              <thead>
                <tr>
                  <th>Currency</th>
                  <th>Rate (1 BRC)</th>
                </tr>
              </thead>
              <tbody>
                {currencies.map((currency) => (
                  currency.code !== 'BRC' && (
                    <tr key={currency.code}>
                      <td>
                        <span className="rates-icon">{renderCurrencySymbol(currency.image)}</span>
                        <span className="currency-name"> {currency.name} ({currency.code})</span>
                      </td>
                      <td>{formatNumber(exchangeRates['BRC'][currency.code])}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BRCExchangeCalculator;