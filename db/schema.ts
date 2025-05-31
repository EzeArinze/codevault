import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});

export const snippetsTable = pgTable("snippets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  language: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }).notNull(),
  category_id: integer().references(() => categoriesTable.id, {
    onDelete: "cascade",
  }),
  code: varchar({ length: 10000 }).notNull(),
  command: text().notNull(),
});
