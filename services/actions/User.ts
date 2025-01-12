"use server"
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { hashPassword, verifyPassword } from '@/lib/auth';
import { redirect } from 'next/dist/server/api-utils';
export async function get_user_id() {
    try {
        const { userId } = await getSession();
     
        if (!userId) {
            return null
            // return new Error("Unauthorized");
        }
        return userId
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
export async function get_user() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            // throw new Error("Unauthorized");
            return null
        }
        const [user] = await db.select().from(users).where(eq(users.id, session.userId));
        console.log(user, "user");
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function get_user_by_id(userId:number) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            // throw new Error("Unauthorized");
            return null
        }
        const [user] = await db.select().from(users).where(eq(users.id,userId));
        console.log(user, "user");
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function create_user({ email, password, name }: { email: string; password: string; name: string }) {
    try {
        const hashedPassword = await hashPassword(password);
        const [newUser] = await db
            .insert(users)
            .values({
                email,
                password: hashedPassword,
                username: name,
            })
            .returning();
        return newUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function update_user({ name, email }: { name?: string; email?: string }) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            throw new Error("Unauthorized");
        }
        const updateData: { name?: string; email?: string } = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        const [updatedUser] = await db.update(users)
            .set(updateData)
            .where(eq(users.id, session.userId))
            .returning();
        return updatedUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}
export async function delete_user() {
    try {
        const session = await getSession();
        if (!session?.userId) {
            throw new Error("Unauthorized");
        }
        await db.delete(users).where(eq(users.id, session.userId));
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}
export async function change_password({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) {
    try {
        const session = await getSession();
        if (!session?.userId) {
            throw new Error("Unauthorized");
        }
        const [user] = await db.select().from(users).where(eq(users.id, session.userId));
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await verifyPassword(oldPassword, user.password!!);
        if (!isPasswordValid) {
            throw new Error('Invalid old password');
        }
        const hashedNewPassword = await hashPassword(newPassword);
        await db.update(users)
            .set({ password: hashedNewPassword })
            .where(eq(users.id, session.userId));
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, message: error instanceof Error ? error.message : 'Failed to change password' };
    }
}