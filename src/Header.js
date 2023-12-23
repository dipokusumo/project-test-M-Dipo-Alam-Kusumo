// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png'; // Ganti dengan path gambar logo yang sesuai

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const menuItems = [
    { to: '/work', label: 'Work' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/ideas', label: 'Ideas' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        width: '100%',
        top: '0',
        left: '0',
        backgroundColor: `rgba(255, 165, 0, ${visible ? 1 : 0})`,
        transition: 'background-color 0.3s',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} alt="Logo" style={{ height: '40px', marginLeft: '40px' }} />
        </Link>
      </div>
      <div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: 0,
            padding: 5,
            gap: '20px', // Jarak antar menu
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.3s',
            marginRight: '50px'
          }}
        >
          {menuItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  borderBottom: location.pathname === item.to && visible ? '2px solid #fff' : 'none',
                  paddingBottom: '3px', // Jarak garis bawah dari teks
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
