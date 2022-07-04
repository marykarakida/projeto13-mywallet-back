import {
	createAccount,
	getUserAccounts,
	deleteUserAccount,
} from '../database/dbAccess.js';

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
	const { token, account } = res.locals;

	try {
		createAccount(token, account);

		res.status(201).send();
	} catch (err) {
		console.error('Error while posting new account', err.message);
		next(err);
	}
}

export function deleteAccount(req, res, next) {
	const { ID } = req.params;
	try {
		deleteUserAccount(ID);

		res.status(201).send();
	} catch (err) {
		console.error('Error while posting new account', err.message);
		next(err);
	}
}
