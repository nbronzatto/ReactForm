import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default App;
