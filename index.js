const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const http = require("http");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");
const resolverFiles = loadFilesSync(path.join(__dirname, "resolvers"))
const typesArray = loadFilesSync(path.join(__dirname, "types"))

const typeDefs = mergeTypeDefs(typesArray)
const resolvers = mergeResolvers(resolverFiles)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();
const httpserver = http.createServer(app);

app.get("/rest", function (req, res) {
  res.json({ data: "api working" });
});

app.listen(4000, function () {
  console.log(`gql path is http://localhost:4000${apolloServer.graphqlPath}`);
});