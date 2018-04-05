import * as Knex from "knex";

export const up = (knex: Knex) => {
    return knex.schema.createTable("candidates", (table) => {
        table.string("accountKey").primary();
        table.string("additionalInformation", 1000).nullable();
        table.string("email").nullable();
        table.string("headline", 1000).nullable();
        table.string("location").nullable();
        table.string("phoneNumber").nullable();
        table.boolean("recentlyUpdated").defaultTo(false).notNullable();
        table.string("roleName", 1000).nullable();
        table.string("summary", 1000).nullable();
        table.string("updatedDate").nullable();
        table.jsonb("links").nullable();
        table.jsonb("workExperience").nullable();
        table.jsonb("education").nullable();
        table.jsonb("skills").nullable();
        table.jsonb("certifications").nullable();
        table.timestamps(false, true);
    });
};

export const down = (knex: Knex) => {
    const environment = process.env.NODE_ENV;
    // We never want to drop tables in production
    if (environment !== "production") {
        return knex.schema.dropTableIfExists("candidates");
    }
};

