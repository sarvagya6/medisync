import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt",
      },
      pages: {
        signIn: "/login",
      },
      providers: [
        GoogleProvider(
            {
                clientId: env.GOOGLE_CLIENT_ID,
                clientSecret: env.GOOGLE_CLIENT_SECRET,
            }
        ),
        ],
        callbacks: {
            async session({ token, session }) {
                if (token) {
                  session.user.id = token.id
                  session.user.name = token.name
                  session.user.email = token.email
                  session.user.image = token.picture
                  session.user.isHealthcareProfessional = token.isHealthcareProfessional

                  console.log('session.user: ', session.user);
                  
                }
          
                return session
            },
            async jwt({ token, user }) {
              const dbUser = await db.user.findFirst({
                where: {
                  email: token.email,
                },
              }
              
              )
        
              if (!dbUser && user) {  // User doesn't exist in DB and is trying to sign up
                // if ishealthcareprofessional = 1 from local storate, then isHealthcareProfessional = true
                const isHealthcareProfessional = localStorage.isHealthcareProfessional == '1' ? true : false;
                console.log('isHealthcareProfessional: ', isHealthcareProfessional);
                // Create a new user in DB
                await db.user.create({
                  data: {
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    isHealthcareProfessional: isHealthcareProfessional,
                  }
                });
              }
          
              if (dbUser) {
                return {
                  id: dbUser.id,
                  name: dbUser.name,
                  email: dbUser.email,
                  picture: dbUser.image,
                  isHealthcareProfessional: dbUser.isHealthcareProfessional,
                }
              }
          
              return token;
            },

            //TODO: Update for production use
            redirect() {
              return '/'
            }
          },
        }

export const getAuthSession = () => getServerSession(authOptions)