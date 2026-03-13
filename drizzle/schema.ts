import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here

/**
 * Stores pending profile fetch requests from the Setup Wizard.
 * When a peer clicks "Fetch Profile Data", a row is created here.
 * Manus reads the profile page and fulfills the request by updating the row.
 */
export const profileFetchRequests = mysqlTable("profileFetchRequests", {
  id: int("id").autoincrement().primaryKey(),
  /** The FBID extracted from the profile URL */
  fbid: varchar("fbid", { length: 32 }).notNull(),
  /** Status: pending → fulfilled | timed_out */
  status: mysqlEnum("status", ["pending", "fulfilled", "timed_out"]).default("pending").notNull(),
  /** Filled by Manus after reading the profile page */
  fullName: text("fullName"),
  jobTitle: text("jobTitle"),
  team: text("team"),
  manager: text("manager"),
  location: text("location"),
  email: text("email"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  fulfilledAt: timestamp("fulfilledAt"),
});

export type ProfileFetchRequest = typeof profileFetchRequests.$inferSelect;
export type InsertProfileFetchRequest = typeof profileFetchRequests.$inferInsert;

/**
 * Per-client materials: docs, sheets, slides, PDFs, images, videos, links, etc.
 * Owned by a user (each dashboard user has their own set of materials per client).
 */
export const clientMaterials = mysqlTable("clientMaterials", {
  id: int("id").autoincrement().primaryKey(),
  /** Client ID matching dashboard.config.ts clients[].id (e.g. "magalu", "amazon") */
  clientId: varchar("clientId", { length: 64 }).notNull(),
  /** Owner user ID — each user manages their own materials */
  userId: int("userId").notNull(),
  label: text("label").notNull(),
  url: text("url").notNull(),
  type: mysqlEnum("type", ["doc", "sheet", "slides", "pdf", "image", "video", "folder", "link"]).default("link").notNull(),
  /** Optional sort order — lower numbers appear first */
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ClientMaterial = typeof clientMaterials.$inferSelect;
export type InsertClientMaterial = typeof clientMaterials.$inferInsert;