import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.scss'

const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/exchanges'}>Exchanges</Link></li>
        <li><Link to={'/coins'}>Coins</Link></li>
      </ul>
    </nav>
  );
}

export default Header