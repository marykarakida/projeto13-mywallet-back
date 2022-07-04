import accountSchema from '../models/account.js';

import { findUserInSession, findUserInDb } from '../database/dbAccess.js';

export async function validateNewAccount(req, res, next) {
	const account = req.body;
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

		const joiValidation = accountSchema.validate(account, {
			abortEarly: false,
		});

		if (joiValidation.error) {
			return res
				.status(422)
				.send('Um ou mais campos não foram preenchidos corretamente');
		}

		res.locals.user = userInSession;
		res.locals.account = account;
		next();
	} catch (err) {
		console.error('Error while validating new account', err.message);
		return res.status(500).send();
	}
}
