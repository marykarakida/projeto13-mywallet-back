import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { connectToDb } from './src/db/connection.js';

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

// Error handling middleware
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).send({ message: err.message });
});

connectToDb(() => {
	app.listen(PORT, () => {
		console.log('Listening on port', PORT);
	});
});
