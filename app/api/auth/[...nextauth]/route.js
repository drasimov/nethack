import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const authOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),   
    ]
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };