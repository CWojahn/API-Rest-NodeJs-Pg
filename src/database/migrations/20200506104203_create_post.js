exports.up = function (knex) {
	return knex.schema.createTable('posts', function (table) {
		table.increments('idpost');
		table.integer('createdby').notNullable();
		table.date('created_at').notNullable();
		table.date('updated_at');
		table.string('description', 50).notNullable();
		table.string('image_url').notNullable();
		table
			.foreign('createdby')
			.references('iduser')
			.inTable('users')
			.onDelete('CASCADE')
			.onUpdate('NO ACTION');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('posts');
};
