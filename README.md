# BRC: BRICS Reserve Currency

## Introduction

BRICS countries (Brazil, Russia, India, China, and South Africa) represent a significant portion of the global economy. However, their trade and financial interactions are often constrained by reliance on the US dollar. This dependence exposes them to volatility and western political influence. Recent efforts towards dedollarization highlight the need for a stable BRICS reserve currency that can facilitate seamless trade and economic cooperation.

# Frontend

npm start
npm build

# Backend
Solidity smart contract

Deployed to Sepolia Ethereum testnet
Gnosis Safe multisig minting authority

BRC Token: 0xf558dA02A1E9176aDDef2A82304F5867cbc61dE6
Multisig: 0xEf01C743Db898B57c9D4b691Af27495d49119b89

Standard ERC20 but multisig can call a mint(to,amount) and a burn(amount) function, don't forget amount has 18 decimals. Multisig is currently setup as 1 off 2 signatures just for testing. Seems to work fine, all quite simple.

## Objectives

The primary objective of the BRICS reserve currency is to create a unified digital asset that offers an efficient medium of exchange for trade among BRICS nations, free from dependency on US dollars and western financial infrastructure.

## BRC Model

BRC adopts a model similar to Tether (USDT), where the digital currency is backed by equally weighted reserves of BRICS national currencies:

- **BRL (Brazilian Real)**
- **CNY (Chinese Yuan)**
- **INR (Indian Rupee)**
- **RUB (Russian Ruble)**
- **ZAR (South African Rand)**

Each currency constitutes 20% of the reserve.

## Minting and Redemption

- **Minting**: Authorized participants deposit wire transfers in their local currency to mint new tokens. Funds are converted into equally weighted amounts and deposited into short-term government bonds offered by each nation.

- **Redemption**: Authorized participants can redeem their digital tokens at any time to receive back their desired currency at current market valuations.

## Exchange Rate and Valuation

The exchange rate will be determined using a dynamic model based on the current value of each currency. This allows for a transparent and market-driven valuation process, reducing reliance on individual nations' economies.

## Dynamic Weightings and Stability

Dynamic weightings provide a balancing mechanism as market volatility of any single currency is mitigated during the regular rebalancing of the reserve basket assets. As government bonds mature, they will be exchanged to constantly keep the portfolio allocated evenly. This stabilization effect benefits the local currencies of all nations involved and offers a significant advantage over commodity-backed asset proposals.
