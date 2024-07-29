import React from 'react'
import '../../Components/NewsLetter/NewsLetter.css'
import { BsSendFill } from "react-icons/bs";
import { Button } from '@mui/material';

const NewsLetter = () => {
  return (

        <div className="newsLetterBanner">
            <BsSendFill className='sendText'/>
            <input type=" text " placeholder='Your email address '/>
            <Button className='bg-g'>Subscribe</Button>
        </div>
  )
}

export default NewsLetter 