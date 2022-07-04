import { createNewUser, createNewSession } from "../database/dbAccess.js";

export function registerUser(req, res, next) {
	const user = res.locals.user;

	try {
		createNewUser(user, res);

		res.status(201).send("User registered");
	} catch (err) {
		console.error("Error while registering new user", err.message);
		next(err);
	}
}

export async function allowAppAccess(req, res, next) {
	const { name, _id } = res.locals.user;

	try {
		const token = await createNewSession(_id);

		const userInfo = {
			name,
			token,
		};

		res.status(201).send(userInfo);
	} catch (err) {
		console.error("Error while allowing user access to app", err.message);
		next(err);
	}
}
