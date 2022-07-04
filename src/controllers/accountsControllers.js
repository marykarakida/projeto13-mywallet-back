import { createAccount } from '../database/dbAccess.js';

export function getAccountsList() {}

export function getTotalBalance() {}

export function postAccount(req, res, next) {
	const { user, account } = res.locals;

	try {
		createAccount(user, account);

		res.status(201).send();
	} catch (err) {
		console.error('Error while posting new account', err.message);
		next(err);
	}
}
