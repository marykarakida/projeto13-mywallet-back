import { createAccount, getUserAccounts } from '../database/dbAccess.js';

export async function getAccountsList(req, res, next) {
	const { token } = res.locals;

	try {
		const { accounts, totalBalance } = await getUserAccounts(token);

		res.status(201).send({ accounts, totalBalance });
	} catch (err) {
		console.error('Error while getting ledger', err.message);
		next(err);
	}
}

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
