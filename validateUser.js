const Joi = require("joi");

const userSchema = Joi.object({
	email: Joi.string().email().max(255).required(),
	firstname: Joi.string().max(255).required(),
	lastname: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
	const { firstname, lastname, email } = req.body;

	const { error } = userSchema.validate(
		{ firstname, lastname, email },
		{ abortEarly: false }
	);

	if (error) {
		res.status(422).json({ validationErrors: error.details });
	} else {
		next();
	}
};

module.exports = {
	validateUser,
}