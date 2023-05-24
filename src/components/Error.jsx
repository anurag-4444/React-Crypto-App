import React from 'react'
import '../styles/error.scss'

const ErrorComponent = ({message}) => {
  return (
    <div className='error'><strong>Failure!</strong><p>{message}</p></div>
  )
}

export default ErrorComponent