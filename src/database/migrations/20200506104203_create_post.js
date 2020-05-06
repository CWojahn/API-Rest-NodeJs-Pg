exports.up = function (knex) {
	return knex.schema.createTable('posts', function (table) {
		table.string('idpost').primary();
		table.string('createdby').notNullable();
		table.date('post_date').notNullable();
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
	knex.schema.dropTable('posts');
};
