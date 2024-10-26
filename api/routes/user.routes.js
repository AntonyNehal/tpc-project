import express from 'express';
import { Login, registerStudent, test, username } from '../controllers/user.controller.js';
const router=express.Router();
router.get('/test',test);
router.post('/students', registerStudent);
router.get('/me',username);
router.post('/login', Login);
export default router;