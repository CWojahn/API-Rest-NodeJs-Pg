exports.up = function (knex) {
	return knex.schema.createTable('followers', function (table) {
		table.increments('idfollower');
		table.integer('iduser').notNullable();
		table.integer('idfollowing').notNullable();
		table.foreign('iduser').references('iduser').inTable('users');
		table.foreign('idfollowing').references('iduser').inTable('users');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('followers');
};
