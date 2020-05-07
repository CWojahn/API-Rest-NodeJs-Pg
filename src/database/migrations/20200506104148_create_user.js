exports.up = function (knex) {
	return knex.schema.createTable('users', function (table) {
		table.increments('iduser');
		table.string('name', 50).notNullable();
		table.string('avatar_url');
		table.string('email', 50).notNullable();
		table.string('phone', 14).notNullable();
		table.string('username', 45).notNullable();
		table.string('user_password', 256).notNullable();
		table.unique('email');
		table.unique('username');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('users');
};
