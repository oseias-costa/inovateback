const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const userData = require("./services/data");
const http = require("http");

let companies = [];
let users = [];
let los = [];
let tasks = [];

const typeDefs = gql`
  type Companie {
    cidade: String
    id: ID
    nome: String
    cnpj: String
  }

  type User {
    email: String
    nivel: String
    id: ID
    nome: String
    senha: String
  }

  type Query {
    companies: [Companie]
    users: [User]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    companies() {
      return companies;
    },
    users() {
      return users;
    },
  },
};

userData("/usuarios").then((res) => (users = res));
userData("/empresas").then((res) => (companies = res));
userData("/lo").then((res) => (los = res));
userData("/atividades").then((res) => (tasks = res));

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
  console.log(`server running on port 4000`);
  console.log(`gql path is http://localhost:4000/${apolloServer.graphqlPath}`);
});
