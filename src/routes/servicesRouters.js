import express from 'express';

import {
	depositMoney,
	withdrawMoney,
} from '../controllers/servicesControllers.js';

const router = express.Router();

router.post('/deposit', depositMoney);
router.post('/withdraw', withdrawMoney);

export default router;
