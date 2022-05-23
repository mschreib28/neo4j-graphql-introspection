# Neo4j GraphQL Introspector

This is a [Next.js](https://nextjs.org/) project that uses Apollo Server to introspect Neo4j schema to generate GraphQL.

CodeSandbox is utilized to enable querying your Neo4j datbase using GraphQL syntax.

## Getting Started

1. Make a copy of `.env.local.example` as `.env.local` and fill out your values for your Neo4j database.

2. Ensure your Neo4j database is up and running (and has some data in it).

3. Update packages
```bash
npm install
# or
yarn
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Query your Neo4j Instance

Open [http://localhost:3000](http://localhost:3000) with your browser to view Code Playground.

### **NOTE** The sample query is JUST A SAMPLE, this does not dynamically populate from your schema (yet)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
