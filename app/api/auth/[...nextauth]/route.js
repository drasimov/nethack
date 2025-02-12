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
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };