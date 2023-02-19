const { newData, updateData, removeData, getData } = require("../services/data")

let users = [];
getData("/usuarios").then((res) => (users = res));

module.exports = {
    Query: {
    users() {
      return users;
    },
    user(obj, args) {
      return users.find((item) => item.id === args.id);
    }
}}