const jwt = require('jsonwebtoken');

module.exports = {
	async sign(payload) {
		return jwt.sign(payload, process.env.SECRET, {
			expiresIn: 84600,
		});
	},

	async verify(token) {
		return jwt.verify(token, process.env.SECRET);
	},
};
