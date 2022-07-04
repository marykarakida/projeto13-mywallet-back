import express from 'express';

import validateToken from '../middlewares/tokenValidation.js';
import { validateNewAccount } from '../middlewares/accountValidation.js';
import {
	getAccountsList,
	postAccount,
} from '../controllers/accountsControllers.js';

const router = express.Router();

router.get('/', validateToken, getAccountsList);
router.post('/', validateNewAccount, postAccount);

export default router;
