import React from 'react'
import '../../Pages/NotFound/NotFound.css'

import { Link } from 'react-router-dom'
import ErrorImg from '../../assets/images/404Error.png'
import { Button } from '@mui/material';


const NotFound = () => {
  return (
    <div className="notFound">
        <div className="container-fluid">
            <div className="box">
                <img src={ErrorImg} alt="" />
                <br /><br />
                <h1>Page Not Found</h1>
                <p>The link you clicked may be broken or the page may have been removed. Vist the Homepage or Contact us about the problem</p>
                <br />
                <div className="d-flex">
                    <Button className="btn-g btn-lg m-auto">
                        <Link to={'/'}>Back to Home Page</Link>
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound