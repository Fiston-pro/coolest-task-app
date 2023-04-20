import { getSdk } from "@/generated/graphql";
import { GraphQLClient } from "graphql-request";

const adminSecret = process.env.HASURA_SECRET;
const url = process.env.HASURA_URL;
const gqlClient = new GraphQLClient(url as string);
gqlClient.setHeader("x-hasura-admin-secret", adminSecret as string);
const client = getSdk(gqlClient);

export default client;