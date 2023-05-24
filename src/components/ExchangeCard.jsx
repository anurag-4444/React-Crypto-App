import React from 'react'
import '../styles/exchangecard.scss'

const ExchangeCard = ({ name, img, rank, url }) => {

    return (

        <div className='main-card'>
            <a target='blank' className='Card' href={url}>
                <img src={img} alt={name} />
                <div>{rank}</div>
                <div>{name}</div>
            </a>
        </div>

    )
}

export default ExchangeCard