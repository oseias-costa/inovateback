const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const app = express();

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const http = require("http");

const typeDefs = gql`
  type Companie {
    cidade: String
    id: ID
    nome: String
    cnpj: String
  }

  type Query {
    companies: [Companie]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    companies: () => companies,
  },
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com",
});

const db = admin.database();

const companiesCollection = db.ref("/empresas");
let companies = [];
let dataCompanies = [];
companiesCollection
  .once("value", (snapshot) => {
    const newData = snapshot.val();
    dataCompanies = [...dataCompanies, newData];
  })
  .then(() => {
    dataCompanies?.map((item) => {
      for (key in item) {
        companies = [...companies, item[key]];
      }
    });
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
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
