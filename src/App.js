import React from 'react';
import './App.css';
import Links from './components/links';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Importaciones Primerta letra mayusculas

function App() {

  return (
    <div className="container p-4">  
      <div className="row">
        <Links/>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
