import express from 'express';
import { edit, getUser, Login, registerStudent, signout, test, userdetails } from '../controllers/user.controller.js';
const router=express.Router();
router.get('/test',test);
router.post('/students', registerStudent);
router.get('/me/:id', getUser);

router.post('/login', Login);
router.post('/signout', signout);

router.get('/users/:name', userdetails);
router.put('/users/:name', edit);
export default router;