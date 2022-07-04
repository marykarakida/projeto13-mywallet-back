import express from 'express';

import validateToken from '../middlewares/tokenValidation.js';
import {
	validateNewAccount,
	validateAccount,
} from '../middlewares/accountValidation.js';
import {
	getAccountsList,
	postAccount,
	deleteAccount,
} from '../controllers/accountsControllers.js';

const router = express.Router();

router.get('/', validateToken, getAccountsList);
router.post('/', validateNewAccount, postAccount);
router.delete('/:ID', validateAccount, deleteAccount);

export default router;
