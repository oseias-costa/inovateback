const express = require("express")
const app = express()
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://curso-dev-2e4db-default-rtdb.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("/");


let data 
ref.once("value", snapshot => {
    const newData = snapshot.val()
   data = {...data, newData}
    console.log(newData)
})


app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT = 8080
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})