import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions ={
    session: {
        strategy:"jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
                credentials: {
                    email: {label: "Email", type: "email"},
                    password: {label: "Password", type: "password"},
                },
            async authorize(credentials) {
            const { email, password } = credentials as {
                email: string;
                password: string;
            };

            // contoh user dummy
            const user = {
                id: "1",
                email: email,
                password: password, // name opsional tapi lebih aman kalau ada
            };

            if (user) {
                return user; // ✅ sudah sesuai tipe User
            }
            return null;
            }

        })
    ],
    callbacks: {
        jwt({token, account, profile, user}){
            if(account?.provider === "credentials"){
                token.email = user.email
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
        if (token?.email) {
            session.user = {
            ...session.user,
            email: token.email,
            };
        }
        return session;
      },
      async redirect({ url, baseUrl}) {
        return `${baseUrl}/dashboard`;
      },
    },
};

export default NextAuth(authOptions);