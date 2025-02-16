import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import { getUser } from "@/api/sql/database";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,  
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            authorization: {
                params: {
                scope: "openid profile email User.Read",
                redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/azure-ad",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Azure AD returns the access_token automatically after code exchange
            if (account) {
                token.accessToken = account.access_token; 
                token.name = profile?.name;
                token.email = profile?.email;
                token.access = 0;
                token.teamID = null;

                const competition = await getUser(profile.email.toLowerCase());
                if(competition){
                    token.access = competition.access;
                    token.teamID = competition.teamID;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.access = token.access;
            session.user.teamID = token.teamID;

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };