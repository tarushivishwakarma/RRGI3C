import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const TeacherDashboard = () => {
  const navigate = useNavigate()
  const id =localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const[data, setData]= useState({})
  const[allProjects , setAllProjects]=useState([])
  const[approvedProjects , setApprovedProjects]=useState([])
  const[rejectedProjects , setRejectedProjects]=useState([])

  const fetchUser=async()=>{
try {
    const user = await axios.get(`http://localhost:8000/api/dashboard/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    setData(user.data)
     toast.success(`Login sucess`)
} catch (error) {
    console.log(error)
}
  }

const fetchProjects =async()=>{
  try {
    const projects = await axios.get(`http://localhost:8000/api/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
    setAllProjects(projects.data)
    console.log(projects.data)
  } catch (error) {
    
  }
} 


const fetchApproveProjects =async()=>{
  try {
    const projects = await axios.get(`http://localhost:8000/api/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
     const approveProjects = projects.data.filter(project => project.status === "approved")
     setApprovedProjects(approveProjects)
  } catch (error) {
    console.log(error)
  }
}

const fetchRejectProjects =async()=>{
  try {
    const projects = await axios.get(`http://localhost:8000/api/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
     const rejectProjects = projects.data.filter(project => project.status === "rejected")
     setRejectedProjects(rejectProjects)
  } catch (error) {
    console.log(error)
  }
}


const approved = async(pid)=>{
  try {
    
  const approve = await axios.patch(`http://localhost:8000/api/project/${pid}/approve`)
    toast.success("Project Approved")
  fetchProjects()
  } catch (error) {
    
  }
}
const Rejected = async(pid)=>{
  try {
    const reject = await axios.patch(`http://localhost:8000/api/project/${pid}/reject`)
    fetchProjects()
    toast.warn("Project Rejected")
  } catch (error) {
    
  }
}

  useEffect(()=>{
    fetchUser(),
    fetchProjects()
    fetchApproveProjects()
    fetchRejectProjects()
  },[])
  
  const logout =()=>{
    localStorage.clear()
    navigate("/")
  }

  return (
    <div>
     <header className='bg-blue-300 flex mb-10'>
        <h1 className='text-2xl p-3'>Welcome {data.name}</h1>
        <button className='bg-red-500 m-2 p-1 rounded-lg ' onClick={logout}>Logout</button>
    </header>
    <div className='w-full '>
  <h1 className='text-center text-5xl mb-10'>Project Submitted by students</h1>
  <h2 className='text-center text-2xl mb-10'>Total Projects :{
          allProjects.length
          }</h2>
      <div className='w-3/4 m-auto grid grid-cols-3 gap-5'>
          
{
  allProjects.map((project)=>{
    return(
      <>
      <div className='w-full'>
              <div className='bg-blue-300 mb-10 p-2 rounded-md'>
          <p>Project name :{project.project}</p>
          <p>Project Status:{project.status}</p>
          <p>Submitted by :{project.studentId.name}</p>
          <button className='bg-green-500 rounded-md p-1 m-1' onClick={()=>approved(project._id)} disabled={project.status !== "pending"}>Approve</button>
          <button className='bg-red-500 rounded-md p-1 m-1' onClick={()=>Rejected(project._id)} disabled={project.status !== "pending"}>Reject</button>
      </div>
      </div>

      </>
    )
  })
}
      </div>
    </div>
    <div className='w-full grid grid-cols-2 mb-30'>
      <div className='w-3/4 m-auto '>
    <h1>Approved Projects</h1>
    <div className='bg-green-200'>
      {
        approvedProjects.map((project)=>{
          return (
            <>
           <p>Project name:{project.project}</p>
            </>
          )
        })
      }
    </div>
    </div>
   <div className='w-3/4 m-auto'>
    <h1>Rejected Projects</h1>
    <div className='bg-red-200 '>
      {
        rejectedProjects.map((project)=>{
          return (
            <>
           <p>Project name:{project.project}</p>
            </>
          )
        })
      }
    </div>
    </div>
    </div>
    <ToastContainer/>
    </div>
  )
}

export default TeacherDashboard
