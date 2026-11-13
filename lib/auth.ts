import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client, db } from "@/lib/db";

export const auth = betterAuth({

    emailAndPassword: {
        enabled: true,
    },
    // Allow auth requests from the LAN address (phones / other PCs on the
    // network). Without this better-auth answers 403 FORBIDDEN for any origin
    // other than BETTER_AUTH_URL (localhost:3000).
    trustedOrigins: [
        "http://192.168.0.108:3000",
        "http://192.168.0.*:3000",
    ],
    user: {
         additionalFields: {
            role: {
                type: ["seeker", "recruiter", "admin"],
                input: true,
                defaultValue: "seeker",
            }
        }
    },
        socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: mongodbAdapter(db, {
        client,
    }),
});