import { createNewUser } from '../db/db.js';

export function registerUser(req, res, next) {
	const user = res.locals.user;

	try {
		createNewUser(user, res);

		res.status(201).send('User registered');
	} catch (err) {
		console.error('Error while registering new user', err.message);
		next(err);
	}
}

export function allowAppAccess(req, res, next) {
	try {
		res.status(200).send();
	} catch (err) {
		console.error('Error while allowing user access to app', err.message);
		next(err);
	}
}
