"use server"
import bcrypt from "bcrypt"

export async function hashPassword(password: string): Promise<string> {
    try {
      // Generate a salt (default rounds is 10)
      const salt = await bcrypt.genSalt(10);
      // Hash the password with the salt
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      throw new Error("Failed to hash password");
    }
  }


  
  export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      // Compare the plain-text password with the hashed password
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      console.error("Error verifying password:", error);
      throw new Error("Failed to verify password");
    }
  }