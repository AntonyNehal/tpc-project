import express from 'express';
import { registerStudent, test } from '../controllers/user.controller.js';
const router=express.Router();
router.get('/test',test);
router.post("/students", registerStudent)
export default router;