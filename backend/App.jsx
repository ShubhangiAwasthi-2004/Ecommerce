import React, { useState } from 'react';
import './App.css'; // Make sure to import the CSS below!

const MARKET_STOCKS = [
  { id: 'AAPL', name: 'Apple Inc.', price: 150 },
  { id: 'GOOGL', name: 'Alphabet Inc.', price: 2800 },
  { id: 'TSLA', name: 'Tesla Inc.', price: 900 },
  { id: 'AMZN', name: 'Amazon', price: 3400 },
];

function App() {
  const [balance, setBalance] = useState(10000); // Starting fake money
  const [portfolio, setPortfolio] = useState([]);

  const handleBuy = (stock) => {
    if (balance >= stock.price) {
      setBalance(balance - stock.price);
      setPortfolio((prev) => {
        const existingStock = prev.find((item) => item.id === stock.id);
        if (existingStock) {
          // Increase quantity if already owned
          return prev.map((item) =>
            item.id === stock.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        // Add new stock to portfolio
        return [...prev, { ...stock, qty: 1 }];
      });
    } else {
      alert("Insufficient funds to buy " + stock.name);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📈 ShopEZ Stock App</h1>
        <p>Buy and manage stocks easily</p>
        <h2>Wallet Balance: <span className="balance">${balance.toLocaleString()}</span></h2>
      </header>

      <div className="dashboard">
        {/* Market Section */}
        <div className="panel">
          <h3>Market View</h3>
          <div className="stock-list">
            {MARKET_STOCKS.map((stock) => (
              <div key={stock.id} className="stock-item">
                <div>
                  <strong>{stock.id}</strong>
                  <p className="stock-name">{stock.name}</p>
                </div>
                <div className="action-area">
                  <span className="price">${stock.price}</span>
                  <button onClick={() => handleBuy(stock)}>Buy</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="panel">
          <h3>My Portfolio</h3>
          {portfolio.length === 0 ? (
            <p className="empty-text">Your portfolio is empty. Buy some stocks!</p>
          ) : (
            <div className="stock-list">
              {portfolio.map((stock) => (
                <div key={stock.id} className="stock-item">
                  <div>
                    <strong>{stock.id}</strong>
                    <p className="stock-name">Qty: {stock.qty}</p>
                  </div>
                  <div className="action-area">
                    <span className="price">Value: ${(stock.price * stock.qty).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
