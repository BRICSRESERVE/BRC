import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto-mono';
import '@fontsource/inter/400.css';
import '@fontsource/inter/900.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "BRC";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "BRICS Reserve Currency");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "BRICS Reserve Currency";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;