import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[role,setRole]=useState("Student")
    const[error,setError]=useState('')


const register =async(e)=>{
    e.preventDefault()
    if(!name || !email || !password){
    return setError("All fileds Necesaary")
    }
   
    try {
        const details= await axios.post('http://localhost:8000/api/signup',{
            name,
            email,
            password,
            role
        })
        setEmail("")
        setPassword("")
        setName("")
        toast.success("Registration Sucessfull")
        setTimeout(() => {
            navigate("/login")
        }, 3000);
        console.log(details)
    } catch (err) {
        setError(err.message)
    }

}

useEffect(()=>{
    register()
},[])

  return (
    <div className='w-full  mb-100 bg-no-repeat bg-cover bg-[url(https://tse2.mm.bing.net/th/id/OIP.4ANu2h5EqHSdqvxLDVrtwwHaE8?pid=Api&P=0&h=180)]'>
        <div className='w-1/2 m-auto align-center  shadow rounded'>
                 <form action="" className='m-auto pt-2 align-center pl-10' onSubmit={register}>
 

                    <h1 className='mb-3 text-3xl text-center mt-10 text-white'>Register Form</h1>
                    {
        <p className='text-center text-white '>{error}</p>
     }
        <label htmlFor="" className='text-white text-xl'>Name</label><br/>
      <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value)}   className='border rounded w-2/3 mb-3 text-white'/><br/>
      <label htmlFor="" className='text-white text-xl'>Email</label><br/>
      <input type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)}  className='border rounded w-2/3 mb-3 text-white'/><br/>
      <label htmlFor="" className='text-white text-xl'>Password</label><br/>
      <input type="password" name="" id=""  value={password} onChange={(e)=>setPassword(e.target.value)} className='border rounded w-2/3 mb-3 text-white' /><br/>
      <label htmlFor="" className='text-white text-xl'>Role</label><br/>
      <select 
       className='border rounded w-2/3 text-white text-xl'
       defaultValue="Student"
       value={role} 
       onChange={(e)=>setRole(e.target.value)}

       >
        <option value="Student">Student</option>
        <option value="Teacher">Teacher</option>
      </select><br/>
      <button type="submit" className='bg-blue-700 hover:bg-blue-800 hover:text-white mt-6 align-center text-white text-center rounded mb-10 p-1'>Signup</button>   
      </form>
    
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register
