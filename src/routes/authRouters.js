import express from 'express';

import validateNewUser from '../middlewares/userValidation.js';

import {
	registerUser,
	allowAppAccess,
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login', allowAppAccess);
router.post('/sign-up', validateNewUser, registerUser);

export default router;
