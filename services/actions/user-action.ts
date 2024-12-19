import { db } from '@/db/db';
import { users } from '@/db/schema';
import { env } from '@/env';
import { eq } from 'drizzle-orm';
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers';
export async function get_user(userId: number){
    if(userId)
    {
      const [user]    = await db.select().from(users).where(eq(users.id, userId))
    return user
    }

    return null
}  
