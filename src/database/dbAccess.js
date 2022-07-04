import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import { v4 as uuid } from 'uuid';

import getDb from './mongodb.js';

export async function findUserInDb(query, res) {
	try {
		const db = getDb();
		const registeredUserCollection = db.collection('registered_users');

		return await registeredUserCollection.findOne(query);
	} catch (err) {
		console.error(err);
	}
}

export async function createNewUser(user, res) {
	delete user.passwordConfirmation;

	try {
		const db = getDb();
		const registeredUserCollection = db.collection('registered_users');

		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.password, salt);

		const newUser = {
			...user,
			password: hashedPassword,
		};

		await registeredUserCollection.insertOne(newUser);
	} catch (err) {
		console.error(err);
	}
}

export async function createNewSession(userId) {
	const token = uuid();

	try {
		const db = getDb();
		const sessionsCollection = db.collection('sessions');

		const newSession = {
			userId,
			token,
		};

		await sessionsCollection.insertOne(newSession);

		return token;
	} catch (err) {
		console.error(err);
	}
}

export async function findUserInSession(token) {
	try {
		const db = getDb();
		const user = await db.collection('sessions').findOne({ token });

		return user;
	} catch (err) {
		console.error(err);
	}
}

export async function createAccount(token, account) {
	try {
		const db = getDb();

		const { userId } = await findUserInSession(token);

		const newAccount = {
			...account,
			value: Number(account.value),
			date: dayjs().format('DD/MM'),
			userId,
		};
		await db.collection('accounts').insertOne(newAccount);
	} catch (err) {
		console.error(err);
	}
}

export async function getUserAccounts(token) {
	try {
		const db = getDb();
		const { userId } = await findUserInSession(token);

		const accounts = await db
			.collection('accounts')
			.find({ userId })
			.toArray();
		const accountsInfo = await db
			.collection('accounts')
			.aggregate([
				{ $match: { userId } },
				{ $group: { _id: '$type', total: { $sum: '$value' } } },
				{ $sort: { _id: 1 } },
			])
			.toArray();

		let totalBalance = 0;

		for (let i = 0; i < accountsInfo.length; i++) {
			if (accountsInfo[i]._id === 'deposit') {
				totalBalance += accountsInfo[i].total;
			} else {
				totalBalance -= accountsInfo[i].total;
			}
		}

		return { accounts, totalBalance };
	} catch (err) {
		console.error(err);
	}
}

export async function validateToken(token, res) {
	if (!token) {
		res.status(401).send('Access denied');
		return false;
	}

	try {
		const userInSession = await findUserInSession(token);

		if (!userInSession) {
			res.status(401).send('Access denied');
			return false;
		}

		const query = { _id: userInSession.userId };
		const userInDb = await findUserInDb(query, res);

		if (!userInDb) {
			res.status(401).send('Access denied');
			return false;
		}

		return true;
	} catch (err) {
		console.error('Error while validating token', err.message);
	}
}

export async function validateAccountId(ID, token, res) {
	if (!token) {
		res.status(404).send();
		return false;
	}

	try {
		const db = getDb();
		const accountsCollection = db.collection('accounts');

		const userInSession = await findUserInSession(token);
		const sameIdAccount = await accountsCollection.findOne({
			_id: ObjectId(ID),
			userId: userInSession.userId,
		});

		if (!sameIdAccount) {
			res.status(404).send();
			return false;
		}

		return true;
	} catch (err) {
		console.error('Error while validating token', err.message);
	}
}

export async function deleteUserAccount(ID) {
	try {
		const db = getDb();
		const accountsCollection = db.collection('accounts');
		await accountsCollection.deleteOne({ _id: ObjectId(ID) });
	} catch (err) {
		console.error('Error while validating token', err.message);
	}
}
