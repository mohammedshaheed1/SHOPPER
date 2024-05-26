import React, { useState } from 'react'
import './CSS/LoginSignup.css'

function LoginSignup() {
  
       const[state,setState]=useState("Sign Up")
       const[formData,setFormData]=useState({
        username:"",
        password:"",
        confirmpassword:"",
        
        email:""
       })
       const changeHandler = (e)=>{
            setFormData({...formData,[e.target.name]:e.target.value})
       }
       
       const login = async()=>{
          console.log("Login function Executed",formData)
          let responceData;
          await fetch('http://localhost:4000/login',{
            method:'post',
            headers:{
              Accept:'application/form-data',
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData)

          }).then((response)=>response.json()).then((data)=>responceData=data)


          if(responceData.success){
            localStorage.setItem('auth-token',responceData.token)
            window.location.replace("/");
          }else{
            alert(responceData.errors)
          }
       }
       const signup =async()=>{
              console.log("signup function executed",formData)
              let responceData;
              await fetch('http://localhost:4000/signup',{
                method:'post',
                headers:{
                  Accept:'application/form-data',
                  'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)

              }).then((response)=>response.json()).then((data)=>responceData=data)


              if(responceData.success){
                localStorage.setItem('auth-token',responceData.token)
                window.location.replace("/");
              }else{
                alert(responceData.errors)
              }
       }
      
    //form validation
    

     const handleSubmit=(e)=>{
         e.preventDefault();
     }

     const [focus,setFocus]=useState({
      errName:false,
      errEmail:false,
      errPassword:false,
      errConfirmPassword:false
     })

     
    


  return (
  <div className="loginsignup">

    <div className="loginsignup-container">
      <h1>{state}</h1>
      <form action="" onSubmit={handleSubmit}>
      <div className="loginsignup-fields">
        {state==="Sign Up"?<input name='username' pattern='^[a-z]{3,10}+$' onBlur={()=>setFocus({...focus,errName:true})} focus={focus.errName.toString()} value={formData.username} onChange={changeHandler} type='text' placeholder='Your Name' required/>:<></>}
        {state==="Sign Up"?<span>Name must be 3-10 letters.</span>:<></>}
        <input name='email' value={formData.email} onChange={changeHandler} onBlur={()=>setFocus({...focus,errEmail:true})} focus={focus.errEmail.toString()} type='email' placeholder='Email Address' required/>
        <span>Please enter a valid email.</span>
        <input name='password' pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$" onBlur={()=>setFocus({...focus,errPassword:true})} focus={focus.errPassword.toString()} value={formData.password} onChange={changeHandler} type='type' placeholder='Password'required/>
        <span>Password must be at least 5 characters long and include letters and numbers.</span>
        {state==="Sign Up"?<input name='confirmpassword' pattern={formData.password} onBlur={()=>setFocus({...focus,errConfirmPassword:true})} focus={focus.errConfirmPassword.toString()} value={formData.confirmpassword} onChange={changeHandler} type='password' placeholder='confirmPassword' required/>:<></>}
        {state==="Sign Up"?<span>Passwords must match.</span>:<></>}
      </div>
      <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
      </form>
      {state==="Sign Up"?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create An Account? <span onClick={()=>{setState("Sign Up")}}>Click here</span></p>}
      <div className="loginsignup-agree">
        <input type='checkbox' name='' id=''/>
        <p>By continuing, i agree to the terms of use & privat policy</p>
      </div>
    </div>

  </div>



  )
}

export default LoginSignup

