import express from 'express';

import {
	getAccountsList,
	getTotalBalance,
} from '../controllers/accountsControllers.js';

const router = express.Router();

router.get('/', getAccountsList);
router.get('/total-balance', getTotalBalance);

export default router;
