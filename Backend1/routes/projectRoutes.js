const routes = require('express').Router()
const {addProject , approveProject,rejectProject} = require('../controllers/projectController')
const {verifyToken} = require('../middleware/authMiddle')

routes.post("/addproject", verifyToken, addProject)
routes.patch("/project/:id/approve", verifyToken, approveProject)
routes.patch("/project/:id/reject", verifyToken, rejectProject)

module.exports = routes