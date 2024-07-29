import React from 'react'
import '../../../Pages/Home/Banner_Bottom/Banner_Bot.css'
import NewsLetter from '../../../Components/NewsLetter/NewsLetter'

const Banner_Bot = () => {
  return (
    <>
        <section className="newsLetterSection">
            <div className="container-fluid">
                <div className="box d-flex align-items-center">
                    <div className="info">
                        <h2 className='mb-3'>Stay home & get your daily <br />needs from our shop</h2>
                        <p>start You'r Daily SHopping Nest Mart</p>
                        <NewsLetter/>                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner_Bot