const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;
		const { iduser } = request.auth;
		const [count] = await connection('posts')
			.where('createdby', iduser)
			.count();

		try {
			const posts = await connection('posts')
				.where('posts.createdby', iduser)
				.limit(10)
				.offset((page - 1) * 10)
				.select('posts.*');

			response.header('X-Total-Count', count['count(*)']);
			return response.json(posts);
		} catch (error) {
			return response.status(401).send(error);
		}
	},

	async create(request, response) {
		const { iduser } = request.auth;
		const { description, image_url } = request.body;
		const created_at = new Date(Date.now());

		try {
			await connection('posts').insert({
				createdby: iduser,
				created_at,
				description,
				image_url,
			});
			return response.sendStatus(201);
		} catch (error) {
			return response.status(401).send(error);
		}
	},

	async update(request, response) {
		const { iduser } = request.auth;
		const { idpost } = request.params;
		const { description, image_url } = request.body;
		const updated_at = new Date(Date.now());

		const post = await connection('posts')
			.where('idpost', idpost)
			.select('createdby')
			.first();

		if (post.createdby != iduser) {
			return response.status(401).send({ error: 'Operation not allowed.' });
		}

		try {
			await connection('posts')
				.where('idpost', idpost)
				.update({ description, image_url, updated_at });
			return response.sendStatus(200);
		} catch (error) {
			return response.status(304).send(error);
		}
	},

	async delete(request, response) {
		const { iduser } = request.auth;
		const { idpost } = request.params;

		const post = await connection('posts')
			.where('idpost', idpost)
			.select('createdby')
			.first();

		if (post.createdby != iduser) {
			return response.status(401).send({ error: 'Operation not allowed' });
		}

		try {
			await connection('posts').where('idpost', idpost).delete();
			return response.sendStatus(204);
		} catch (error) {
			return response.status(304).send(error);
		}
	},

	async shown(request, response) {
		const { page = 1 } = request.query;
		const [count] = await connection('posts').count();

		try {
			const posts = await connection('posts')
				.leftJoin('users', 'posts.createdby', 'users.iduser')
				.limit(10)
				.offset((page - 1) * 10)
				.select('posts.*', 'users.name', 'users.avatar_url');

			response.header('X-Total-Count', count['count(*)']);
			return response.json(posts);
		} catch (error) {
			return response.status(401).send(error);
		}
	},
};
