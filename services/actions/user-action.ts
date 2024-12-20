import { db } from '@/db/db';
import { User, users } from '@/db/schema';
import { getSession } from '@/lib/session';
import { eq } from 'drizzle-orm';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export async function get_user() {
  try {
   const session = await getSession();
    if (!session?.userId) {
      throw new Error("Unauthorized");
    }



    const [user] = await db.select().from(users).where(eq(users.id, session.userId));
console.log(user, "user")
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}