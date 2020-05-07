const express = require('express');
const routes = express.Router();
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('./middlewares/authMiddleware');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const followControler = require('./controllers/followController');
const feedController = require('./controllers/feedController');

routes.post('/login', loginController.index);

routes.post(
	'/signup',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			avatar_url: Joi.string(),
			email: Joi.string().email().required(),
			phone: Joi.string().required().max(14),
		}),
	}),
	userController.create,
);
routes.get('/me', authMiddleware, userController.index);
routes.put(
	'/me',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			avatar_url: Joi.string(),
			email: Joi.string().email().required(),
			phone: Joi.string().required().max(14),
		}),
	}),
	authMiddleware,
	userController.update,
);
routes.delete('/me', authMiddleware, userController.delete);
routes.get('/users', userController.shown);
routes.get('/me/following', authMiddleware, followControler.index);
routes.get('/me/followers', authMiddleware, followControler.followers);

routes.post(
	'/post',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			description: Joi.string().required(),
			image_url: Joi.string().required(),
		}),
	}),
	authMiddleware,
	postController.create,
);
routes.get('/post', authMiddleware, postController.index);
routes.put(
	'/post/:idpost',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			description: Joi.string().required(),
			image_url: Joi.string().required(),
		}),
	}),
	authMiddleware,
	postController.update,
);
routes.delete('/post/:idpost', authMiddleware, postController.delete);
routes.get('/posts', authMiddleware, postController.shown);

routes.post(
	'/user',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			idfollow: Joi.number().required(),
		}),
	}),
	authMiddleware,
	followControler.create,
);
routes.delete(
	'/user',
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			idfollow: Joi.number().required(),
		}),
	}),
	authMiddleware,
	followControler.delete,
);

routes.get('/feed', authMiddleware, feedController.index);

module.exports = routes;
