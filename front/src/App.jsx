import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Form from './components/Form/Form';

function App() {
  return (
    <div className="app">

      <main className="main-content">
        <Form />
      </main>
      <Footer />
    </div>
  );
}

export default App;
