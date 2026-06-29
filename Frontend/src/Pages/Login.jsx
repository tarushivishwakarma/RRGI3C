import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import API from '../Services'

const Login = () => {
    const navigate = useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const submitButton =async(e)=>{
        e.preventDefault()
        if(!email || !password){
             return toast.error("All Fields Necessary")
        }
        try {
            const login= await axios.post(`${API}/login`,{
                email,password
            })
            setEmail("")
            setPassword("")
            localStorage.setItem("token" , login.data.token)
            localStorage.setItem("role" ,login.data.role )
            localStorage.setItem("id",login.data.id)
            if(login.data.role === "Student"){
          navigate("/studentdashboard")
            }
             if(login.data.role === "Teacher"){
          navigate("/teacherdashboard")
            }
            

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        submitButton()
    },[])

  return (
    <div className='w-full bg-no-repeat bg-cover bg-[url(https://tse4.mm.bing.net/th/id/OIP.ITu5iJ6RqfNBC1NZcIid4AHaF7?pid=Api&P=0&h=180)]'>
    <div className='w-1/2 m-auto align-center shadow rounded mb-10'>
                 <form action="" className=' p-20 mb-10' onSubmit={submitButton}>
                    <h1 className='mb-3 text-3xl text-center text-white'>Login Form</h1>
      <label htmlFor="" className='text-white text-xl'>Email</label><br/>
      <input type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)} className='border rounded p-1 text-white'/><br/>
      <label htmlFor="" className='text-white text-xl'>Password</label><br/>
      <input type="password" name="" id="" className='border rounded text-white p-1' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>  
      <button type="submit" className='bg-white mt-6 rounded  p-1 object-bottom-right'>Login</button>   
      </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login
