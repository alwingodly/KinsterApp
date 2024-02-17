import express from 'express'
import { adminPass , getAllUsers , setAdminToggle , tasker } from '../controllers/adminController.js'
const route = express.Router()

route.post("/adminpass" ,adminPass )
route.get("/allusers" , getAllUsers )
route.post("/adminToggle",setAdminToggle )
route.post("/tasker",tasker )

export default route