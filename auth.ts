import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import type { User } from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const users = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return users[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        //验证用户输入的邮箱和密码
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        //如果验证成功，返回用户信息
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          //获取用户信息
          const user = await getUser(email);
          if (!user) return null;
          //验证用户输入的密码和数据库中的密码是否一致
          // const pass = await bcrypt.hash("123456", 10);
          // console.log("pass", pass);
          const passwordsMatch = await bcrypt.compare(password, user.password);
          // const passwordsMatch = password === user.password;

          if (passwordsMatch) return user;
        }
        //如果验证失败，返回null
        return null;
      },
    }),
  ],
});
