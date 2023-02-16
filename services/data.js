var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com",
});

const db = admin.database();

async function getData(collection) {
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

function newData(collection, data) {
  newReference = db.ref(collection).push();
  newId = newReference.key;
  newObjData = { ...data, id: newId };
  newReference.set(newObjData);
  return newObjData;
}

function updateData(collection, data) {
  const path = `${collection}/${data.id}`;
  db.ref(path).update(data);
  return data;
}

function removeData(collection, data) {
  const path = `${collection}/${data.id}`;
  db.ref(path).remove();
  return data;
}

module.exports = { getData, newData, updateData, removeData };
