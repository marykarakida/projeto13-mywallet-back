import express from 'express';

import {
	registerUser,
	allowAppAccess,
} from '../controllers/authControllers.js';

const router = express.Router();

router.post('/login', registerUser);
router.post('/sign-up', allowAppAccess);

export default router;
