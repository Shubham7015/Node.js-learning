import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// User table schema definition for the URL shortener service
export const usersTable = pgTable("users", {
  // Primary key: universally unique identifier for each user
  id: uuid().primaryKey().defaultRandom(),

  // User first name stored as a short varchar
  firstname: varchar("first_name", { length: 100 }).notNull(),

  // User last name stored as a short varchar
  lastname: varchar("last_name", { length: 100 }),

  // Unique user email address used for login/identification
  email: varchar({ length: 255 }).notNull().unique(),

  // Hashed password for secure authentication
  password: text().notNull(),

  // Salt value used when hashing the password
  salt: text().notNull(),

  // Timestamp when the user record was created
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Timestamp when the user record was last updated
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
