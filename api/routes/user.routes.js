import express from 'express';
import { Login, registerStudent, signout, test, username } from '../controllers/user.controller.js';
const router=express.Router();
router.get('/test',test);
router.post('/students', registerStudent);
router.get('/me',username);
router.post('/login', Login);
router.post('/signout', signout);
export default router;