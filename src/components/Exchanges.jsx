import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import ExchangeCard from './ExchangeCard'
import Loader from './Loader'
import '../styles/exchange.scss'
import ErrorComponent from './Error'

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchExchanges()
  }, [])

  if(error) return <ErrorComponent message="Error While Fetching"/>

  return (
    <div className='exchanges'>
      <div className="items">

        {(loading) ? <Loader /> : exchanges.map((i) => (<ExchangeCard
          name={i.name}
          img={i.image}
          rank={i.trust_score_rank}
          url={i.url}
          key={i.id}
        />))}

      </div>
    </div>
  )
}

export default Exchanges