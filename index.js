import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDb } from './src/db/db.js';

import authRouters from './src/routes/authRouters.js';
import accountsRouters from './src/routes/accountsRouters.js';
import servicesRouters from './src/routes/servicesRouters.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouters);
app.use('/accounts', accountsRouters);
app.use('/services', servicesRouters);

connectToDb(() => {
	app.listen(PORT, () => {
		console.log('Listening on port', PORT);
	});
});
