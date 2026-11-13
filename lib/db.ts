import { MongoClient } from "mongodb";

// Single shared connection to the Atlas cluster — used by better-auth
// (lib/auth.ts) and by server actions such as createJob (lib/actions/jobs.ts).
const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string);

export { client };
export const db = client.db("Adminloop");
