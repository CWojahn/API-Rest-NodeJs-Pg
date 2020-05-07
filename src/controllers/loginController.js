const connection = require('../database/connection');
const crypto = require('crypto');
const jwt = require('../utils/jwt');

module.exports = {
	async index(request, response) {
		const [, hash] = request.headers.authorization.split(' ');
		const [username, password] = Buffer.from(hash, 'base64')
			.toString()
			.split(':');
		user_password = crypto.createHash('md5').update(password).digest('hex');

		try {
			const user = await connection('users')
				.where('username', username)
				.andWhere('user_password', user_password)
				.select('iduser')
				.first();

			if (!user) {
				return response.sendStatus(401);
			}

			const token = await jwt.sign({ iduser: user.iduser });
			response.status(200).send({ user, token });
		} catch (error) {
			response.status(401).send(error);
		}
	},
};
