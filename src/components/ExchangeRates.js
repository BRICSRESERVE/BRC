import axios from 'axios';

const API_URL = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest';
const API_KEY = '999313976amshdf6c7cf1e9461a3p14a34bjsna6bf982095bc'; // Replace with your RapidAPI key
const API_HOST = 'currency-conversion-and-exchange-rates.p.rapidapi.com';

const brcToAedRate = 15.1972;

async function getExchangeRates() {
  
  const calcCryptoRates = async (brcusd) => {
    const cryptoRates = {};
    const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
    response.data.forEach(market => {
      if (market.symbol == 'BTCUSDT') cryptoRates['BTC'] = 1 / market.price * brcusd; 
      if (market.symbol == 'ETHUSDT') cryptoRates['ETH'] = 1 / market.price * brcusd; 
    });
    return cryptoRates;
  }

  // Run this locally in dev mode to save API abuse
  if (window.location.hostname == 'localhost') {
    const rates = {
      "BRC": 1,
      "CNY": 28.92949771999914,
      "RUB": 347.5117591151066,
      "INR": 340.49435693468143,
      "ZAR": 74.95196712912478,
      "BRL": 22.96792689538737,
      "AED": 14.9024865,
      "AUD": 6.223173828126872,
      "CAD": 5.595634781048735,
      "EUR": 3.7127874469926083,
      "GBP": 3.189559163237728,
      "JPY": 588.1185077957564,
      "USD": 4.057289568624159
    };
    const crypto = await calcCryptoRates(rates.USD);
    const combinedRates = {
      ...rates,
      ...crypto
    };
    return combinedRates;
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        from: 'AED',
        to: 'CNY,RUB,INR,ZAR,BRL,AED,AUD,CAD,EUR,GBP,JPY,USD'
      },
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    });
    
    const rates = response.data.rates;
    // Example Response {ANG: 1.968869,SVC: 9.558929,CAD: 1.508234,XCD: 2.951445,MVR: 16.763914,HRK: 7.544148,AUD: 1.678715,MWK: 1894.260284,XAG: 0.040245,MAD: 10.749364,PHP: 62.958808,NAD: 20.240694,GNF: 9415.720429,KES: 141.435349,MZN: 69.784949,BTN: 91.709678,MGA: 4962.185376,AZN: 1.854885,XAU: 0.000455,RON: 4.97745,CHF: 0.930597,EGP: 53.732558,BSD: 1.092382,TWD: 35.798376,GGP: 0.841526,LVL: 0.660598,MMK: 3547.086457,WST: 3.061811,ILS: 4.195971,BHD: 0.411629,GBP: 0.859502,TZS: 2949.698767,SDG: 656.891172,LAK: 24197.037952,DJF: 194.533471,BYN: 3.57511,LBP: 97827.949024,RWF: 1449.812643,PEN: 4.068629,EUR: 1,ZMK: 9830.176548,RSD: 117.026887,INR: 91.650151,MUR: 50.509727,BWP: 14.862658,GEL: 2.94314,KMF: 490.88698,UZS: 13758.923285,RUB: 93.428446,CUC: 1.092096,BGN: 1.959017,JOD: 0.77408,NGN: 1740.746874,BDT: 128.35704,PKR: 304.429923,BRL: 6.182574,KZT: 522.456098,CVE: 110.425911,HNL: 27.041814,NZD: 1.838175,ERN: 16.381446,NPR: 146.737855,ZMW: 28.376089,FKP: 0.841526,DZD: 147.147952,JMD: 171.298044,CRC: 577.636433,GMD: 75.90399,PLN: 4.30777,AMD: 423.963081,BMD: 1.092096,BZD: 2.201989,BBD: 2.205694,SBD: 9.272271,IDR: 17636.373723,ALL: 100.316179,IQD: 1431.085354,BIF: 3148.445521,HKD: 8.51086,GIP: 0.841526,BAM: 1.958636,LKR: 330.087976,QAR: 3.996023,SAR: 4.100329,TOP: 2.602247,SEK: 11.538266,ZAR: 20.192507,ARS: 1021.930296,MYR: 4.886019,BYR: 21405.089136,KPW: 982.887128,CZK: 25.265689,STD: 22604.190225,BTC: 0.000019683629,ZWL: 351.65459,LSL: 20.240694,COP: 4527.383851,PAB: 1.092382,IRR: 45982.718212,CNH: 7.809663,NOK: 11.965467,XPF: 119.331742,XOF: 656.914244,XDR: 0.822206,OMR: 0.420421,CNY: 7.805979,NIO: 40.208591,AOA: 959.405062,SCR: 14.594756,MOP: 8.768658,ISK: 150.894551,VND: 27455.303106,VES: 39.983683,USD: 1.092096,UYU: 44.214023,VEF: 3956176.525474,MRU: 43.270657,UGX: 4068.891863,DOP: 64.97468,UAH: 44.801684,BOB: 7.54907,TTD: 7.409729,KGS: 92.37486,TND: 3.374586,SGD: 1.447541,TMT: 3.833258,GHS: 16.965878,TJS: 11.530602,KHR: 4488.540626,ETB: 103.56827,PGK: 4.29626,THB: 38.824574,AED: 4.011284,GTQ: 8.465336,LRD: 219.031174,SYP: 2743.925332,KYD: 0.910427,SRD: 31.35955,HTG: 144.151375,LYD: 5.243641,SLL: 22900.719136,SLE: 24.951457,SHP: 0.841526,IMP: 0.841526,FJD: 2.464211,PYG: 8270.954143,KRW: 1505.061567,SZL: 20.234319,GYD: 228.512985,MDL: 19.309137,MXN: 21.190405,CLP: 1040.450949,LTL: 3.224677,SOS: 624.309734,MNT: 3767.732904,AFN: 77.533691,CUP: 28.940554,CLF: 0.037705,JPY: 157.878973,TRY: 36.695738,YER: 273.433665,HUF: 397.64272,BND: 1.449926,JEP: 0.841526,MKD: 61.585267,AWG: 1.968504,CDF: 3128.855749,VUV: 129.655908,XAF: 656.920268,KWD: 0.333766,DKK: 7.462906 }

    const multiplier = brcToAedRate / rates.AED;

    const forexRates = {
        BRC: 1,
        CNY: rates.CNY * multiplier,
        RUB: rates.RUB * multiplier,
        INR: rates.INR * multiplier,
        ZAR: rates.ZAR * multiplier,
        BRL: rates.BRL * multiplier,
        AED: rates.AED * multiplier,
        AUD: rates.AUD * multiplier,
        CAD: rates.CAD * multiplier,
        EUR: rates.EUR * multiplier,
        GBP: rates.GBP * multiplier,
        JPY: rates.JPY * multiplier,
        USD: rates.USD * multiplier,
        BTC: rates.BTC * multiplier,
    };

    const crypto = await calcCryptoRates(forexRates.USD);
    const combinedRates = {
      ...forexRates,
      ...crypto
    };
    return combinedRates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
}

export default getExchangeRates;
