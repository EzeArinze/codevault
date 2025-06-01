import {
  boolean,
  // integer,
  pgTable,
  text,
  timestamp,
  // varchar,
} from "drizzle-orm/pg-core";
// import { nanoid } from "nanoid";

// Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Snippets and Categories Tables

// export const categoriesTable = pgTable("categories", {
//   id: text()
//     .primaryKey()
//     .$defaultFn(() => nanoid()),
//   name: varchar({ length: 255 }).notNull(),
// });

// export const snippetsTable = pgTable("snippets", {
//   id: text()
//     .primaryKey()
//     .$defaultFn(() => nanoid()),
//   title: varchar({ length: 255 }).notNull(),
//   language: varchar({ length: 255 }).notNull(),
//   description: varchar({ length: 1000 }).notNull(),
//   category_id: integer().references(() => categoriesTable.id, {
//     onDelete: "cascade",
//   }),
//   code: varchar({ length: 10000 }).notNull(),
//   command: text().notNull(),
//   user_id: text()
//     .notNull()
//     .references(() => user.id, {
//       onDelete: "cascade",
//     }),
// });
