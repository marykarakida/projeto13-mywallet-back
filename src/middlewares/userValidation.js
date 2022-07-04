import bcrypt from "bcrypt";

import { findUserInDb } from "../database/dbAccess.js";
import { newUserSchema, UserSchema } from "../models/user.js";

export async function validateNewUser(req, res, next) {
	const user = req.body;

	try {
		const joiValidation = newUserSchema.validate(user, {
			abortEarly: false,
		});

		if (joiValidation.error) {
			return res
				.status(422)
				.send("Um ou mais campos não foram preenchidos corretamente");
		}

		const query = { email: user.email };
		const userInDb = await findUserInDb(query, res);

		if (userInDb) {
			return res.status(409).send("Falha na criação de uma nova conta");
		}

		res.locals.user = user;
		next();
	} catch (err) {
		console.error("Error while validating new user", err.message);
		return res.status(500).send();
	}
}

export async function validateUser(req, res, next) {
	const user = req.body;

	try {
		const joiValidation = UserSchema.validate(user, {
			abortEarly: false,
		});

		if (joiValidation.error) {
			return res
				.status(422)
				.send("Um ou mais campos não foram preenchidos corretamente");
		}

		const query = { email: user.email };
		const userInDb = await findUserInDb(query, res);

		const isPasswordCorrect =
			userInDb && bcrypt.compareSync(user.password, userInDb.password);

		if (userInDb && isPasswordCorrect) {
			res.locals.user = userInDb;
			next();
		} else {
			return res.status(404).send("O email ou a senha estão incorretas");
		}
	} catch (err) {
		console.error("Error while validating user", err.message);
		return res.status(500).send();
	}
}
