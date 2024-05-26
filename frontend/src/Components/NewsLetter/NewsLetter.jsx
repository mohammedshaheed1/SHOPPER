import React from 'react'
import './NewsLetter.css'

function NewsLetter() {
  return (
   <div className="newsletter">
<h2> Get Exclusive Offers On Your Email</h2>
<p>Subscribe to our NewsLetter and stay updated</p>
<div>
    <input type='email' placeholder='your email id'/>
    <button>Subscribe</button>
</div>
   </div>
   
  )
}

export default NewsLetter