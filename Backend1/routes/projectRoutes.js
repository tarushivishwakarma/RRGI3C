const routes = require('express').Router()
const {addProject , approveProject,rejectProject , studentProjects ,deleteProject} = require('../controllers/projectController')
const {verifyToken} = require('../middleware/authMiddle')

routes.post("/addproject", addProject)
routes.patch("/project/:id/approve", verifyToken, approveProject)
routes.patch("/project/:id/reject", verifyToken, rejectProject)
routes.get('/student/projects' , studentProjects)
routes.delete('/delete/project/:id' , deleteProject)

module.exports = routes