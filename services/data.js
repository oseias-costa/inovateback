var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com",
});

const db = admin.database();

async function userData(collection) {
  const setCollection = db.ref(collection);
  let convert = [];
  let dataDb = [];
  await setCollection
    .once("value", (snapshot) => {
      const newData = snapshot.exportVal();
      dataDb = [...dataDb, newData];
    })
    .then(() => {
      dataDb?.map((item) => {
        for (key in item) {
          convert = [...convert, item[key]];
        }
      });
    });
  return await convert;
}

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

module.exports = userData;
