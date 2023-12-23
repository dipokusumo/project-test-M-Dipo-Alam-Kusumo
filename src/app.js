// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './Header';
import Banner from './Banner';
import Ideas from './Ideas';
import './App.css'; // Import file CSS untuk gaya aplikasi

const Home = () => <div className="content">Ini halaman Work</div>;
const About = () => <div className="content">Ini halaman About</div>;
const Services = () => <div className="content">Ini halaman Services</div>;
const Careers = () => <div className="content">Ini halaman Careers</div>;
const Contact = () => <div className="content">Ini halaman Contact</div>;
const NotFound = () => <div className="content">Halaman tidak ditemukan</div>;

const App = () => {
  
  return (
    <Router>
      <div>
        <Header />
        <Banner />
        <Routes>
          <Route path="/work" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
