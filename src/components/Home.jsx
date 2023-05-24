import React from 'react'
import btc from '../assets//btc.png'
import '../styles/home.scss'

const Home = () => {
  return (
    <div className='box'>
      <div className='xcrypto'>Xcrypto</div>
      <img src={btc} alt="bitcoin" />
    </div>
  )
}

export default Home