import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.model";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import connectToDatabase from "./mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./dbClient";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isValid) return null;

        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
