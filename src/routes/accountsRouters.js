import express from 'express';

import { validateNewAccount } from '../middlewares/accountValidation.js';
import {
	getAccountsList,
	getTotalBalance,
	postAccount,
} from '../controllers/accountsControllers.js';

const router = express.Router();

router.get('/', getAccountsList);
router.post('/', validateNewAccount, postAccount);
router.get('/total-balance', getTotalBalance);

export default router;
