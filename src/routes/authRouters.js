import express from 'express';

import {
	validateNewUser,
	validateUser,
} from '../middlewares/userValidation.js';

import {
	registerUser,
	allowAppAccess,
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login', validateUser, allowAppAccess);
router.post('/sign-up', validateNewUser, registerUser);

export default router;
