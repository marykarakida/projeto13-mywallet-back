import joi from 'joi';

const accountSchema = joi.object({
	value: joi.number().min(0.01).required(),
	description: joi.string().min(1).required(),
	type: joi.string().valid('deposit', 'withdraw').required(),
});

export default accountSchema;
