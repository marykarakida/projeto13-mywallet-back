import joi from 'joi';

export const newUserSchema = joi.object({
	name: joi.string().min(1).required(),
	email: joi.string().email().required(),
	password: joi.string().min(8).required(),
	passwordConfirmation: joi.string().valid(joi.ref('password')).required(),
});

export const UserSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
});
