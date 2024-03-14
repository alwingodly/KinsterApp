
import express from 'express';
import { getUserTask , updateTask } from '../controllers/userController.js';

const router = express.Router();
router.get('/usertask', getUserTask);
router.get('/updateTaskStatus', updateTask);
// router.post('/leave', leaveApplication);



export default router;
