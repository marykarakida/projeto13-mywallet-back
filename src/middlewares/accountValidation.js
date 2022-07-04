import accountSchema from '../models/account.js';

import { validateToken, validateAccountId } from '../database/dbAccess.js';

export async function validateNewAccount(req, res, next) {
	const account = req.body;
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	const isTokenValid = await validateToken(token, res);

	if (!isTokenValid) {
		return res.status(401).send('Access denied');
	}

	try {
		const joiValidation = accountSchema.validate(account, {
			abortEarly: false,
		});

		if (joiValidation.error) {
			return res
				.status(422)
				.send('Um ou mais campos não foram preenchidos corretamente');
		}

		res.locals.token = token;
		res.locals.account = account;
		next();
	} catch (err) {
		console.error('Error while validating new account', err.message);
		return res.status(500).send();
	}
}

export async function validateAccount(req, res, next) {
	const { ID } = req.params;
	const { authorization } = req.headers;
	const token = authorization?.replace('Bearer ', '');

	try {
		const isTokenValid = await validateToken(token, res);

		if (!isTokenValid) {
			return;
		}

		const isAccountIdValid = await validateAccountId(ID, token, res);

		if (!isAccountIdValid) {
			return;
		}

		next();
	} catch (err) {
		console.error('Error while validating account', err.message);
		return res.status(500).send();
	}
}
