import * as Knex from "knex";

export const up = (knex: Knex) => {
    return knex.schema.createTable("clips", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("url").notNullable();
        table.string("curator").notNullable();
        table.boolean("reddit").defaultTo(false);
        table.timestamps(false, true);
    });
};

export const down = (knex: Knex) => {
    const environment = process.env.NODE_ENV;
    // We never want to drop tables in production
    if (environment !== "production") {
        return knex.schema.dropTableIfExists("clips");
    }
};


