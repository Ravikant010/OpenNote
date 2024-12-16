import { pgTable, text, boolean, timestamp, uniqueIndex, serial, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  profileName: text('profile_name'),
  avatar: text("user_avatar"),
  password: text('password_hash'),
  emailVerified: boolean('email_verified').default(false),
  authProvider: text('auth_provider'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  usernameIdx: uniqueIndex('username_idx').on(table.username)
}));

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tags: jsonb('tags'),
  isPublic: boolean('is_public').notNull().default(true),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (table) => ({
  userNotesIdx: uniqueIndex('user_notes_idx').on(table.userId, table.createdAt)
}));

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  noteId: integer('note_id').notNull().references(() => notes.id),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => ({
  userLikesIdx: uniqueIndex('user_likes_idx').on(table.userId, table.noteId)
}));

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  noteId: integer('note_id').notNull().references(() => notes.id, {
    onDelete: "cascade"
  }),
  userId: integer('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (table) => ({
  userCommentsIdx: uniqueIndex('user_comments_idx').on(table.userId, table.noteId, table.createdAt)
}));

export const userRelations = relations(users, ({ many }) => ({
  notes: many(notes),
  likes: many(likes),
  comments: many(comments)
}));

export const noteRelations = relations(notes, ({ one, many }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id]
  }),
  likes: many(likes),
  comments: many(comments)
}));

export const likeRelations = relations(likes, ({ one }) => ({
  note: one(notes, {
    fields: [likes.noteId],
    references: [notes.id]
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id]
  })
}));

export const commentRelations = relations(comments, ({ one }) => ({
  note: one(notes, {
    fields: [comments.noteId],
    references: [notes.id]
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id]
  })
}));

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;