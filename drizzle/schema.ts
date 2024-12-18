import { pgTable, uniqueIndex, foreignKey, serial, text, jsonb, boolean, integer, timestamp, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const notes = pgTable("notes", {
	id: serial().primaryKey().notNull(),
	title: text().notNull(),
	content: text().notNull(),
	tags: jsonb(),
	isPublic: boolean("is_public").default(true).notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		userNotesIdx: uniqueIndex("user_notes_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.createdAt.asc().nullsLast().op("int4_ops")),
		notesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "notes_user_id_users_id_fk"
		}),
	}
});

export const comments = pgTable("comments", {
	id: serial().primaryKey().notNull(),
	noteId: integer("note_id").notNull(),
	userId: integer("user_id").notNull(),
	content: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		userCommentsIdx: uniqueIndex("user_comments_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.noteId.asc().nullsLast().op("timestamp_ops"), table.createdAt.asc().nullsLast().op("int4_ops")),
		commentsNoteIdNotesIdFk: foreignKey({
			columns: [table.noteId],
			foreignColumns: [notes.id],
			name: "comments_note_id_notes_id_fk"
		}).onDelete("cascade"),
		commentsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_users_id_fk"
		}),
	}
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	username: text().notNull(),
	profileName: text("profile_name"),
	userAvatar: text("user_avatar"),
	passwordHash: text("password_hash"),
	emailVerified: boolean("email_verified").default(false),
	authProvider: text("auth_provider"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		emailIdx: uniqueIndex("email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
		usernameIdx: uniqueIndex("username_idx").using("btree", table.username.asc().nullsLast().op("text_ops")),
		usersEmailUnique: unique("users_email_unique").on(table.email),
		usersUsernameUnique: unique("users_username_unique").on(table.username),
	}
});

export const likes = pgTable("likes", {
	id: serial().primaryKey().notNull(),
	noteId: integer("note_id").notNull(),
	userId: integer("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		userLikesIdx: uniqueIndex("user_likes_idx").using("btree", table.userId.asc().nullsLast().op("int4_ops"), table.noteId.asc().nullsLast().op("int4_ops")),
		likesNoteIdNotesIdFk: foreignKey({
			columns: [table.noteId],
			foreignColumns: [notes.id],
			name: "likes_note_id_notes_id_fk"
		}),
		likesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "likes_user_id_users_id_fk"
		}),
	}
});
