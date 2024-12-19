// "use server";
// import { db } from "@/db/db";
// import { users } from "@/db/schema";
// import { z } from "zod";
// import { eq } from "drizzle-orm";
// import bcrypt from "bcrypt";
// import type { User } from "@/types/types";
// import { getIronSession } from "iron-session";
// import { cookies } from "next/headers";
// import { env } from "@/env";
// import { redirect } from "next/navigation";
// // Iron Session configuration
// const sessionOptions = {
//   password: process.env.SESSION_SECRET!, // Must be at least 32 characters
//   cookieName: "open-note-session",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "strict",
//   },
// };
// // Define session type
// interface SessionData {
//   userId?: number;
//   email?: string;
//   username?: string;
// }
// const SignupSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
//   username: z.string().min(3).max(20),
// });
// export async function getSession() {
//   return getIronSession<SessionData>(await cookies(), sessionOptions);
// }
// export async function signup(UserData: User) {
//   const session = await getSession();
//   if (UserData.providerId === "google.com") {
//     const { email, displayName, photoURL, providerId } = UserData;
//     const [existingUser] = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email));
//     if (existingUser) {
//       // Handle existing user
//       session.userId = existingUser.id;
//       session.email = existingUser.email;
//       session.username = existingUser.username;
//       await session.save();
//       return redirect("/explore");
//     }
//     // Insert new Google user
//     const [new_user] = await db
//       .insert(users)
//       .values({
//         email,
//         profileName: displayName,
//         avatar: photoURL,
//         authProvider: providerId,
//         username: email.replace("@gmail.com", ""),
//       })
//       .returning();
//     // Set session for new Google user
//     session.userId = new_user.id;
//     session.email = new_user.email;
//     session.username = new_user.username;
//     await session.save();
//     return { user: new_user };
//   } else {
//     const { email, password } = UserData;
//     // Check if user already exists
//     const [existingUser] = await db
//       .select()
//       .from(users)
//       .where(eq(users.email, email));
//     if (existingUser) {
//       return { error: "Email already exists" };
//     }
//     if (email && password) {
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       // Insert new user with hashed password
//       const [new_user] = await db
//         .insert(users)
//         .values({
//           email,
//           authProvider: "open-note",
//           username: email.replace("@gmail.com", ""),
//           password: hashedPassword,
//         })
//         .returning();
//       // Set session for new user
//       session.userId = new_user.id;
//       session.email = new_user.email;
//       session.username = new_user.username;
//       await session.save();
//       return { user: new_user };
//     }
//   }
//   // If no valid signup method is provided
//   return { error: "Invalid signup data" };
// }
// export async function login(formData: FormData) {
//   const username = formData.get("username") as string;
//   const password = formData.get("password") as string;
//   const session = await getSession();
//   try {
//     const [user] = await db
//       .select()
//       .from(users)
//       .where(eq(users.username, username));
//     if (!user) {
//       return { error: "Invalid credentials" };
//     }
//     const isValid = await bcrypt.compare(password, user.passwordHash || "");
//     if (!isValid) {
//       return { error: "Invalid credentials" };
//     }
//     // Set session for logged-in user
//     session.userId = user.id;
//     session.email = user.email;
//     session.username = user.username;
//     await session.save();
//     return { success: true, user };
//   } catch (error) {
//     return { error: "Login failed" };
//   }
// }
// export async function logout() {
//   const session = await getSession();
//   session.destroy();
//   return { success: true };
// }
// export async function getCurrentUser() {
//   const session = await getSession();
//   if (session.userId) {
//     const [user] = await db
//       .select()
//       .from(users)
//       .where(eq(users.id, session.userId));
//     return user;
//   }
//   return null;
// }
"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import type { User, GoogleUser, EmailPasswordUser } from "@/types/types";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "@/env";
import { redirect } from "next/navigation";

// Iron Session configuration
const sessionOptions = {
  password: process.env.SESSION_SECRET!, // Must be at least 32 characters
  cookieName: "open-note-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
  },
};

// Define session type
interface SessionData {
  userId?: number;
  email?: string;
  username?: string;
}

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3).max(20),
});

export async function getSession() {
  return getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function signup(UserData: User) {
  const session = await getSession();

  if (UserData.providerId === "google.com") {
    const { email, displayName, photoURL, providerId } = UserData as GoogleUser;
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));

    if (existingUser) {
      session.userId = existingUser.id;
      session.email = existingUser.email;
      session.username = existingUser.username;
      await session.save();
      return redirect("/explore");
    }

    const [newUser] = await db.insert(users).values({
      email,
      profileName: displayName,
      avatar: photoURL,
      authProvider: providerId,
      username: email.replace("@gmail.com", ""),
    }).returning();

    session.userId = newUser.id;
    session.email = newUser.email;
    session.username = newUser.username;
    await session.save();
    return { user: newUser };
  } else {
    const { email, password } = UserData as EmailPasswordUser;
    const [existingUser] = await db.select().from(users).where(eq(users.email, email));

    if (existingUser) {
      return { error: "Email already exists" };
    }

    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [newUser] = await db.insert(users).values({
        email,
        authProvider: "open-note",
        username: email.replace("@gmail.com", ""),
        password: hashedPassword,
      }).returning();

      session.userId = newUser.id;
      session.email = newUser.email;
      session.username = newUser.username;
      await session.save();
      return { user: newUser };
    }
  }

  return { error: "Invalid signup data" };
}

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const session = await getSession();

  try {
    const [user] = await db.select().from(users).where(eq(users.username, username));

    if (!user || !(await bcrypt.compare(password, user.password || ""))) {
      return { error: "Invalid credentials" };
    }

    session.userId = user.id;
    session.email = user.email;
    session.username = user.username;
    await session.save();
    return { success: true, user };
  } catch (error) {
    return { error: "Login failed" };
  }
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  return { success: true };
}

export async function getCurrentUser() {
  const session = await getSession();

  if (session.userId) {
    const [user] = await db.select().from(users).where(eq(users.id, session.userId));
    return user;
  }

  return null;
}