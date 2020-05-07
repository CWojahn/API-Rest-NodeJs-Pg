const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
	async index(request, response) {
		const { iduser } = request.auth;
		try {
			const user = await connection('users')
				.where('iduser', iduser)
				.select(
					'users.iduser',
					'users.name',
					'users.avatar_url',
					'users.email',
					'users.phone',
				)
				.first();

			response.status(200).send({ user });
		} catch (error) {
			response.status(401).send(error);
		}
	},

	async create(request, response) {
		const [, hash] = request.headers.authorization.split(' ');
		const [username, password] = Buffer.from(hash, 'base64')
			.toString()
			.split(':');
		const { name, avatar_url, email, phone } = request.body;
		const user_password = crypto
			.createHash('md5')
			.update(password)
			.digest('hex');
		try {
			await connection('users').insert({
				name,
				avatar_url,
				email,
				phone,
				username,
				user_password,
			});
			return response.sendStatus(201);
		} catch (error) {
			return response.status(401).send(error);
		}
	},

	async update(request, response) {
		const { iduser } = request.auth;
		const { name, avatar_url, email, phone } = request.body;
		try {
			await connection('users')
				.where('iduser', iduser)
				.update({ name, avatar_url, email, phone });
			return response.sendStatus(200);
		} catch (error) {
			return response.status(401).send({ error: 'Operation not permitted.' });
		}
	},

	async delete(request, response) {
		const { iduser } = request.auth;

		try {
			await connection('users').where('iduser', iduser).detele();
			return response.sendStatus(204);
		} catch (error) {
			return response.status(401).send({ error: 'Operation not permitted.' });
		}
	},

	async shown(request, response) {
		const { page = 1 } = request.query;
		const [count] = await connection('users').count();

		try {
			const users = await connection('users')
				.limit(10)
				.offset((page - 1) * 10)
				.select('users.name', 'users.avatar_url');
			response.header('X-Total-Count', count['count(*)']);
			return response.json(users);
		} catch (error) {
			return response.status(401).send({ error: 'Operation not permitted.' });
		}
	},
};
