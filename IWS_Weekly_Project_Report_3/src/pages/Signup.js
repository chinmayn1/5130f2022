import React, { UseState } from 'react';
import '../css/login.css'

const Signup = () => {
  
    const submit=()=>{
      alert("Hii")
      
      
    }

  return (

    <div className="wrapper">

      <div className="container">

        <input type="text" placeholder="Email" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <input type="text" placeholder="First Name" id="username" />
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Username" id="username" />
        <input type="text" placeholder="Username" id="username" />
        <button id='submit' onClick={submit}>Next</button>
      </div>
    </div>
  )
}

export default Signup;