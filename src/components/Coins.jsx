import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import Loader from './Loader'
import '../styles/exchange.scss'
import ErrorComponent from './Error'
import CoinCard from './CoinCard'

const Coins = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState('inr')

  const pageChange = (page) => {
    setPage(page)
    setLoading(true)
  }

  const btns = new Array(132).fill(1)

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$'

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins()
  }, [currency, page])

  if (error) return <ErrorComponent message="Error While Fetching Coins." />

  return (
    <div className='exchanges'>

      
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="radio">
              <input type="radio" name="currency" value="inr" id="inr" defaultChecked onClick={() => { setCurrency('inr') }} />
              <label htmlFor="inr" onClick={() => { setCurrency('inr') }}>INR</label>

              <input type="radio" name="currency" value="usd" id="usd" onClick={() => { setCurrency('usd') }} />
              <label htmlFor="usd" onClick={() => { setCurrency('usd') }}>USD</label>

              <input type="radio" name="currency" value="eur" id="eur" onClick={() => { setCurrency('eur') }} />
              <label htmlFor="eur" onClick={() => { setCurrency('eur') }}>EUR</label>

            </div>
            <div className="items">
            {coins.map((i) => (
              <CoinCard
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                price={i.current_price}
                key={i.id}
                id={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
            <div className="pageSelection">
              <button type='button' className='pageButton' onClick={() => { pageChange(page - 1) }} disabled={page === 1 ? true : false}>prev</button>

              <div className="multiplePages">
                {btns.map((items, index) => (<button className="pageButton" key={index} onClick={() => { pageChange(index + 1) }}>{index + 1}</button>))}

              </div>

              <button className="pageButton" onClick={() => { pageChange(page + 1) }}>next</button>
            </div>
            </div>
          </>
        )}
      
    </div >
  );
}
export default Coins