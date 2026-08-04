import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

// URL table schema definition for the URL shortener service
export const urlsTable = pgTable("urls", {
  // Primary key: universally unique identifier for each shortened URL
  id: uuid().primaryKey().defaultRandom(),

  // Unique short code used in the shortened URL (e.g., "abc123")
  shortCode: varchar("code", { length: 255 }).notNull().unique(),

  // The original full URL that the short code redirects to
  targetUrl: text("target_url").notNull(),

  // Foreign key referencing the user who created this shortened URL
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),

  // Timestamp when the URL record was created
  createdAt: timestamp("created_at").defaultNow().notNull(),

  // Timestamp when the URL record was last updated
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});