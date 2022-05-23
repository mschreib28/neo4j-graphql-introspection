import fs from 'fs';
import neo4j from 'neo4j-driver';

import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { Neo4jGraphQL } from '@neo4j/graphql';
import { toGraphQLTypeDefs } from '@neo4j/introspector';
// BUG Fix for apollo server
import 'ts-tiny-invariant';


const driver = neo4j.driver(
  process.env.NEO4J_INTROSPECTION_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const sessionFactory = () => driver.session({ defaultAccessMode: neo4j.session.READ });

const readonly = true; // We don't want to expose mutations in this case
const typeDefs = await toGraphQLTypeDefs(sessionFactory, readonly);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  playground: true,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// This can be run to generate your .graphql schema to a file
export const main = () => {
  fs.writeFileSync('schema.graphql', typeDefs)
}

