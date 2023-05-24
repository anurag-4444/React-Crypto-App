import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from '..'
import ErrorComponent from './Error'
import Loader from './Loader'
import '../styles/CoinDetail.scss'
import Chart from './Chart'


const CoinDetails = () => {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState('inr')
  const [days, setDays] = useState('24h')
  const [chartArray, setChartArray] = useState([])

  const { id } = useParams()
  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'

  const btns = ['24h', '7d', '14d', '30d', '60d', '200d', '1y', 'max']

  const switchChartStats = (key) => {
    switch (key) {
      case '24h':
        setDays(key)
        setLoading(true)
        break;
      case '7d':
        setDays(key)
        setLoading(true)
        break;
      case '14d':
        setDays(key)
        setLoading(true)
        break;
      case '30d':
        setDays(key)
        setLoading(true)
        break;
      case '60d':
        setDays(key)
        setLoading(true)
        break;
      case '200d':
        setDays(key)
        setLoading(true)
        break;
      case '1y':
        setDays('365d')
        setLoading(true)
        break;
      case 'max':
        setDays(key)
        setLoading(true)
        break;

      default:
        setDays(key)
        setLoading(true)
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${id}`)
        const { data: chartData } = await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        setCoin(data)
        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        console.log(error.message)
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [id, currency, days])

  if (error) return <ErrorComponent message="Error While Fetching Coin." />

  return (
    <div className="coinDetail">
      {(loading) ? <Loader /> : (
        <>
          
          <Chart arr={chartArray} currency={currencySymbol} days={days} />

          <div className='btns'>
            {btns.map((i) => (<div className='btn' onClick={() => { switchChartStats(i) }} key={i}>{i}</div>))}
          </div>

          <div className="coinDetailCard">

            <div className="badge">#{coin.market_cap_rank}</div>

            <div className="radio">
              <input type="radio" name="currency" value="inr" id="inr" defaultChecked onClick={() => { setCurrency('inr') }} />
              <label htmlFor="inr" onClick={() => { setCurrency('inr') }}>INR</label>

              <input type="radio" name="currency" value="usd" id="usd" onClick={() => { setCurrency('usd') }} />
              <label htmlFor="usd" onClick={() => { setCurrency('usd') }}>USD</label>

              <input type="radio" name="currency" value="eur" id="eur" onClick={() => { setCurrency('eur') }} />
              <label htmlFor="eur" onClick={() => { setCurrency('eur') }}>EUR</label>

            </div>

            <div className="coinCard">

              <p>Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}</p>

              <img src={coin.image.large} alt={coin.id} />
              <p>{coin.id}</p>

              <strong>{currencySymbol}{coin.market_data.current_price[currency]}</strong>

              <div className='increaseAndDecrease'>
                {(coin.market_data.price_change_percentage_24h > 0) ? <div className="increaseSymbol"></div> : <div className="decreaseSymbol"></div>}
                <p>{coin.market_data.price_change_percentage_24h}%</p>
              </div>

              <div className="loadbar">
                <div></div>
              </div>

              <div className="definition">
                <div className='one'>{currencySymbol}{coin.market_data.high_24h[currency]}</div>
                <div className='two'>24H Range</div>
                <div className='three'>{currencySymbol}{coin.market_data.low_24h[currency]}</div>
              </div>


              <div className="maxSupply"><p> Max Supply</p>
                <p> {coin.market_data.max_supply}</p>
              </div>
              <div className="maxSupply"><p>Circulating Supply</p>
                <p>{coin.market_data.circulating_supply}</p>
              </div>
              <div className="maxSupply"><p>Markey Cap</p><p>{currencySymbol}
                {coin.market_data.market_cap[currency]}</p>
              </div>
              <div className="maxSupply"><p>All Time Low</p><p>{currencySymbol}
                {coin.market_data.atl[currency]}</p>
              </div>
              <div className="maxSupply"><p>All Time High</p><p>{currencySymbol}
                {coin.market_data.ath[currency]}</p>
              </div>

            </div>

          </div>
        </>
      )}
    </div>
  )

}

export default CoinDetails