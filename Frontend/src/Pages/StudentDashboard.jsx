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
          const[isLoading , setIsLoading]=useState(true)


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
  setIsLoading(false)
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
  <div className="min-h-screen bg-slate-100">

    {/* Header */}
    <header className="bg-blue-700 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome, {data.name}
          </h1>
          <p className="text-blue-100">
            Student Dashboard
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>

    <div className="max-w-7xl mx-auto p-8 grid lg:grid-cols-2 gap-8">

      {/* Projects */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Your Projects
        </h2>

        {isLoading && (
          <p>Loading...</p>
        )}

        <div className="space-y-5">

          {projects.length === 0 && !isLoading && (
            <p>No Projects Uploaded.</p>
          )}

          {projects.map((item) => (

            <div
              key={item._id}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >

              <div className="flex justify-between">

                <h3 className="text-xl font-semibold">
                  {item.project}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm

                  ${
                    item.status === "Approved"
                      ? "bg-green-500"
                      : item.status === "Rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <p className="text-gray-600 mt-3">
                {item.description}
              </p>

              <p className="mt-2">
                <strong>Teacher:</strong>{" "}
                {item.teacherId.name}
              </p>

              <button
                onClick={() => deleteProject(item._id)}
                className="mt-5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Delete Project
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Form */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-6">
          Submit Project
        </h2>

        <form onSubmit={addproject} className="space-y-5">

          <div>

            <label className="font-medium">
              Project Name
            </label>

            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="font-medium">
              Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <div>

            <label className="font-medium">
              Select Teacher
            </label>

            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="mt-2 w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                Select Teacher
              </option>

              {allTeachers.map((teacher) => (

                <option
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.name}
                </option>

              ))}

            </select>

          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Project
          </button>

        </form>

      </div>

    </div>

    <ToastContainer />

  </div>
);
}

export default StudentDashboard
