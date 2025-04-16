import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalList from './components/AnimalList';
import AnimalDetail from './components/AnimalDetail';
import AnimalForm from './components/AnimalForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalList />} />
	      <Route path="/add" element={<AnimalForm />} />
        <Route path="/edit/:id" element={<AnimalForm />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

