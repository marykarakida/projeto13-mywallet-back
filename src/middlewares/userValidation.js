import newUserSchema from '../models/user.js';

import { findUserInDb } from '../db/db.js';

export default async function validateNewUser(req, res, next) {
	const user = req.body;

	try {
		const joiValidation = newUserSchema.validate(user, {
			abortEarly: false,
		});

		if (joiValidation.error) {
			return res
				.status(422)
				.send('Um ou mais campos não foram preenchidos corretamente');
		}

		const dbValidation = await findUserInDb(user, res);

		if (dbValidation) {
			return res.status(409).send('Falha na criação de uma nova conta');
		}

		res.locals.user = user;
		next();
	} catch (err) {
		console.error('Error while validating new user', err.message);
		return res.status(500).send();
	}
}
