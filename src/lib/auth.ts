import "server-only";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// @ts-ignore
import clientPromise from "./clientPromise";
import { User } from "@/models/user";
import { dbConnect } from "@/lib/dbConnect";
import { SITE_NAME } from "./constants";

export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET!,
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  theme: {
    colorScheme: "dark",
  },
  providers: [
    CredentialsProvider({
      name: SITE_NAME,
      credentials: {
        email: {
          label: "Your Email",
          type: "email",
        },
        password: {
          label: "Your Password",
          type: "password",
        },
      },

      // Login the user.
      // Check if the user's password match with the hased password saved in the database or not
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials!;

        await dbConnect();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Email or password is incorrect. Please try again");
        }

        // @ts-ignore
        if (!user.password) {
          throw new Error(
            "Email or password is incorrect. Click Forgot Password to set a new password",
          );
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          // @ts-ignore
          user.password!,
        );

        if (!isPasswordMatched) {
          throw new Error("Email or password is incorrect. Please try again");
        }

        return {
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.name = token.name;
        // @ts-ignore
        session.user.email = token.email;
        // @ts-ignore
        session.user.image = token.image;
      }
      return session;
    },

    async jwt({ token, user }) {
      await dbConnect();

      const dbUser = await User.findOne({
        email: token.email,
      });

      if (!dbUser) {
        token.id = user?.id;
        return token;
      }

      return {
        id: dbUser._id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
      };
    },
  },
};

// Currently we have to manually create req and res object to pass to getServerSession (in Next13)
export const getAuthSession = cache(async () => {
  const req = {
    headers: Object.fromEntries(headers() as Headers),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value]),
    ),
  };
  const res = { getHeader() {}, setCookie() {}, setHeader() {} };

  // @ts-ignore - The type used in next-auth for the req object doesn't match, but it still works fine.
  return await getServerSession(req, res, authOptions);
});
