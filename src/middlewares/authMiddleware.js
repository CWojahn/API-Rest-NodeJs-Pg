const jwt = require('../utils/jwt');
const connection = require('../database/connection');

const authMiddleware = async (request, response, next) => {
	token = request.headers['x-access-token'];

	try {
		const payload = await jwt.verify(token);

		const user = await connection('users')
			.select('name', 'avatar_url', 'iduser')
			.where('iduser', payload.iduser)
			.first();

		if (!user) {
			return response.sendStatus(401);
		}
		request.auth = user;
		next();
	} catch (error) {
		return response.status(401).send(error);
	}
};

module.exports = authMiddleware;
