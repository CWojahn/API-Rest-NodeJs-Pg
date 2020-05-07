const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;
		const { iduser } = request.auth;
		const [count] = await connection('posts')
			.innerJoin('followers', 'posts.createdby', 'followers.idfollowing')
			.where('followers.iduser', iduser)
			.count();

		try {
			const feed = await connection('posts')
				.innerJoin('followers', 'posts.createdby', 'followers.idfollowing')
				.innerJoin('users', 'posts.createdby', 'users.iduser')
				.where('followers.iduser', iduser)
				.limit(10)
				.offset((page - 1) * 10)
				.select('posts.*', 'users.name', 'users.avatar_url');

			response.header('X-Total-Count', count['count(*)']);
			return response.json(feed);
		} catch (error) {
			return response.status(401).send(error);
		}
	},
};
