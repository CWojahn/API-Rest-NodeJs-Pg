const connection = require('../database/connection');

module.exports = {
	async index(request, response) {
		const { iduser } = request.auth;

		try {
			const following = await connection('followers')
				.innerJoin('users', 'users.iduser', 'followers.idfollowing')
				.where('followers.iduser', iduser)
				.select('users.name', 'users.avatar_url');

			return response.json(following);
		} catch (error) {
			console.log(error);
			return response.status(401).send(error);
		}
	},

	async create(request, response) {
		const { iduser } = request.auth;
		const { idfollow } = request.body;

		try {
			await connection('followers').insert({
				iduser: iduser,
				idfollowing: idfollow,
			});
			return response.sendStatus(200);
		} catch (error) {
			console.log(error);
			return response.status(401).send(error);
		}
	},

	async delete(request, response) {
		const { iduser } = request.auth;
		const { idfollow } = request.body;
		try {
			await connection('followers')
				.where('iduser', iduser)
				.andWhere('idfollowing', idfollow)
				.delete();
			return response.sendStatus(200);
		} catch (error) {
			return response.status(304).send(error);
		}
	},

	async followers(request, response) {
		const { iduser } = request.auth;

		try {
			const followers = await connection('followers')
				.where('idfollowing', iduser)
				.innerJoin('users', 'users.iduser', 'followers.iduser')
				.select('users.name', 'users.avatar_url');

			return response.json(followers);
		} catch (error) {
			return response.status(401).send(error);
		}
	},
};
