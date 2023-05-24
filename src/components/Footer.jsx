import React from 'react'
import '../styles/footer.scss'
import user from '../assets/user.png'

const Footer = () => {
    return (
        <footer>
            <div className="foot">
                <div className='foot1'>
                    <p>About Us</p>
                    <p>We are the best crypto trading app in India, we provide our guidance at a reasonable price</p>
                </div>

                <div className="foot2">
                    <div>
                    <img src={user} alt="user" />
                    <p style={{'font-weight': 'bolder'}}>Our founder</p>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer