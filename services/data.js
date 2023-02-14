var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com",
});

const db = admin.database();

const userData = (collection) => {
  const userCollection = db.ref(collection);
  let users = [];
  let data = [];
  userCollection
    .once("value", (snapshot) => {
      const newData = snapshot.exportVal();
      data = [...data, newData];
    })
    .then(() => {
      data?.map((item) => {
        for (key in item) {
          convert = [...data, item[key]];
        }
      });
    });
};

const companiesCollection = db.ref("/empresas");
let companies = [];
let dataCompanies = [];
companiesCollection
  .once("value", (snapshot) => {
    const newData = snapshot.exportVal();
    dataCompanies = [...dataCompanies, newData];
  })
  .then(() => {
    dataCompanies?.map((item) => {
      for (key in item) {
        companies = [...dataCompanies, item[key]];
      }
    });
  });
