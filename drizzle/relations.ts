import { relations } from "drizzle-orm/relations";
import { users, notes, comments, likes } from "./schema";

export const notesRelations = relations(notes, ({one, many}) => ({
	user: one(users, {
		fields: [notes.userId],
		references: [users.id]
	}),
	comments: many(comments),
	likes: many(likes),
}));

export const usersRelations = relations(users, ({many}) => ({
	notes: many(notes),
	comments: many(comments),
	likes: many(likes),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	note: one(notes, {
		fields: [comments.noteId],
		references: [notes.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));

export const likesRelations = relations(likes, ({one}) => ({
	note: one(notes, {
		fields: [likes.noteId],
		references: [notes.id]
	}),
	user: one(users, {
		fields: [likes.userId],
		references: [users.id]
	}),
}));