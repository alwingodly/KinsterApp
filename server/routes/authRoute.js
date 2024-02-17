import express from 'express'
import { userLogin, superAdminAuthentications } from '../controllers/authController.js'
const route = express.Router()

route.post("/login" ,userLogin )
route.post ("/superadmin", superAdminAuthentications)

export default route