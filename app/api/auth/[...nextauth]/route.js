import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const authOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            authorization: {
                params: {
                    redirect_uri: 'http://localhost:3000/api/auth/callback/azure-ad', 
                    // response_type: 'code',
                    scope: 'openid profile',
                },
            },
        }),   
    ],
    callbacks: {
        async jwt({ token, account, profile, code }) {
            // Persist the OAuth access_token to the token right after signin
            // console.log(account);
            console.log(profile);
            // console.log(code);
            if (account) {
              token.name = account.name
            }
            return token
          },
          async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.name = token.name
            return session
          }
        }
            
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };