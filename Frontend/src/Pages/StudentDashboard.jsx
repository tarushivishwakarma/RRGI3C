import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const StudentDashboard = () => {
  const navigate = useNavigate()
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token")
      const[data,setData]=useState({})
      const[allTeachers,setAllTeachers]=useState([])
      const[teacherId,setTeacherId]=useState("")
      const[project,setProject]=useState("")
      const[description ,setDescription]=useState("")
      const[projects,setProjects]=useState([])


    const fetchUser = async()=>{
  try {
      const user = await axios.get(`http://localhost:8000/api/dashboard/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
      console.log(user)
  } catch (error) {
    console.log(error)
  }
    }

  const fetchTeachers =async()=>{
try {
   const teachers = await axios.get('http://localhost:8000/api/allteachers')
   setAllTeachers(teachers.data)
} catch (error) {
  console.log(error)
}
  }

const addproject =async(e)=>{
  e.preventDefault()
try {
  const projects = await axios.post("http://localhost:8000/api/addproject",{
    studentId:id,
    teacherId,
    project,
    description
  })
  setProject("")
  setDescription("")
  setTeacherId("")
  fetchProjects()
  toast.success("Project Added Sucessfully")
} catch (error) {
  
}
}


const fetchProjects =async()=>{
try {
  const projectsDetails = await axios.get('http://localhost:8000/api/student/projects',{
    headers:{
      studentid :`${id}`
    }
  })
  setProjects(projectsDetails.data)
} catch (error) {
  console.log(error)
}
}

const logout=()=>{
  localStorage.clear()
  navigate("/")
}
const deleteProject=async(pid)=>{
  try {
     const deleteProject = await axios.delete(`http://localhost:8000/api/delete/project/${pid}`)
     fetchProjects()
     toast.success("Project Deleted Sucessfully")
  } catch (error) {
    console.log(error)
  }
}

      useEffect(()=>{
        fetchUser(),
        fetchTeachers(),
        fetchProjects()
    },[])

  return (
    <div>
    <header className='bg-blue-300 flex'>
        <h1 className='text-2xl p-3'>Welcome {data.name}</h1>
        <button className='bg-red-500 m-2 p-1 rounded-lg ' onClick={logout}>Logout</button>
    </header>

{/* // this is to see the projects */}

<div className='mt-10'>
  <div className='bg-blue-200 w-3/4 m-auto'>
    <h1 className='text-2xl mb-5 text-center'>Your Projects</h1>
    <div className='w-3/4 m-auto grid grid-cols-2 gap-5'>
      {
        projects.map((project)=>{
          return(
            <>
            <div className='bg-blue-600 rounded-lg mb-2 p-2 '>
            <p>Project name:{project.project}</p>
            <p>Project Status:{project.status}</p>
            <p>Teacher :{project.teacherId.name}</p>
            <button onClick={()=>deleteProject(project._id)}  className='p-1 bg-blue-900 border rounded-md'>delete</button>
            </div>
            </>
          )
        })
      }
    </div>
  </div>
  
</div>

{/* this section is adding projects */}
<div className='w-full mt-10 p-0'>
<div className='w-1/2 shadow bg-blue-200 m-auto'>
<form action="" className='p-5' onSubmit={addproject}>
  <h1 className='text-2xl mb-7'>Submit your Projects Here..</h1>
  <label htmlFor="" className='text-xl mb-5'>Project Name:</label><br/>
  <input type="text" name="" id="" value={project} onChange={(e)=>setProject(e.target.value)} className='border rounded-md mb-5 w-3/4'/><br/>

  <label htmlFor="" className='text-xl'>Project Description:</label><br/>
  <input type="text" name="" id="" value={description} onChange={(e)=>setDescription(e.target.value)}  className='border rounded-md w-3/4 mb-5'/><br/>

  <label htmlFor="" className='text-xl'>Select Teacher:</label><br/>
  <select name="" id="" className='border rounded-md w-3/4 mb-5' 
  value={teacherId}
  onChange={(e)=>setTeacherId(e.target.value)}
  >
       <option value="">Select Teacher</option>
    {
     
      allTeachers.map((teacher)=>{
       return (
        <>
        <option value="" 
        key={teacher._id}
        value={teacher._id}
        >{teacher.name}</option>
        </>
       )
      })
    }
  </select>
  <button type="submit" className='p-1 bg-blue-500 rounded-md '>Submit Project</button>
</form>
</div>
</div>

    <ToastContainer/>
    </div>
  )
}

export default StudentDashboard
