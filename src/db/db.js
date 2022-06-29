import bcrypt from 'bcrypt';

import { getDb } from './connection.js';

export async function findUserInDb(user, res) {
	const { email } = user;

	try {
		const db = getDb();
		const registeredUserCollection = db.collection('registered_users');

		return await registeredUserCollection.findOne({ email });
	} catch (err) {
		console.error(err);
		return res.status(500).send();
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
		return res.status(500).send();
	}
}
