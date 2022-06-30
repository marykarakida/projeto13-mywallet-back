import express from 'express';

import {
	getAccountsList,
	getTotalBalance,
	postAccount,
} from '../controllers/accountsControllers.js';

const router = express.Router();

router.get('/', getAccountsList);
router.post('/', postAccount);
router.get('/total-balance', getTotalBalance);

export default router;
