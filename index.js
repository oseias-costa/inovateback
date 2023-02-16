const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();
const { getData, newData, updateData, removeData } = require("./services/data");
const http = require("http");
const pagination = require("./utils/pagination");
const filterTasks = require("./utils/filterTasks");

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

  type Task {
    ano: Int
    atividade: String
    empresa: String
    id: ID
    mes: String
    prazo: String
    realizado: String
    responsavel: String
    situacao: String
    creadedAt: Int
    frequencia: String
  }

  type Query {
    companies(page: Int): [Companie]

    users: [User]
    user(id: String): User

    los(
      status: String
      responsible: String
      month: String
      year: Int
      frequency: String
      company: String
      page: Int
    ): [Task]
    tasks: [Task]
  }

  type Mutation {
    newCompany(cidade: String, nome: String, cnpj: String): Companie!
    updateCompany(
      id: String
      cidade: String
      nome: String
      cnpj: String
    ): Companie!
    removeCompany(id: String): Companie!
  }
`;

const resolvers = {
  Query: {
    companies(obj, args) {
      const getPage = pagination(companies, args.page, 5);
      return getPage;
    },
    users() {
      return users;
    },
    user(obj, args) {
      return users.find((item) => item.id === args.id);
    },
    los(obj, args) {
      async function filterList() {
        const filter = await filterTasks(los, args);
        return pagination(filter, args.page, 5);
      }
      return filterList();
    },
    tasks() {
      return tasks;
    },
  },
  Mutation: {
    newCompany(_, args) {
      return newData("/empresas", args);
    },
    updateCompany(_, args) {
      return updateData("/empresas", args);
    },
    removeCompany(_, args) {
      return removeData("/empresas", args);
    },
  },
};

getData("/usuarios").then((res) => (users = res));
getData("/empresas").then((res) => (companies = res));
getData("/lo").then((res) => (los = res));
getData("/atividades").then((res) => {
  console.log(res.length / 5);
  tasks = res;
});

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
