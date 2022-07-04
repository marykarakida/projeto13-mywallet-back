import { findUserInSession, findUserInDb } from '../database/dbAccess.js';

export default async function validateToken(req, res, next) {
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	if (!token) {
		return res.status(401).send('Access denied');
	}

	try {
		const userInSession = await findUserInSession(token);

		if (!userInSession) {
			return res.status(401).send('Access denied');
		}

		const query = { _id: userInSession.userId };
		const userInDb = await findUserInDb(query, res);

		if (!userInDb) {
			return res.status(401).send('Access denied');
		}

		res.locals.token = userInSession.token;

		next();
	} catch (err) {
		console.error('Error while validating token', err.message);
		return res.status(500).send();
	}
}
