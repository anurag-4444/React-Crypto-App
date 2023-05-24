import React from 'react'
import '../styles/exchangecard.scss'
import { Link } from 'react-router-dom'

const CoinCard = ({ id, name, img, symbol, price, currencySymbol }) => {

    return (

        <div className='main-card'>
            <Link to={`/coin/${id}`} target='blank' className='Card'>
                <img src={img} alt={name} style={{height: '50px'}}/>
                <div>{symbol}</div>
                <div>{name}</div>
                <div>{currencySymbol}{price}</div>
            </Link>
        </div>

    )
}

export default CoinCard