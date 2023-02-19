const { newData, updateData, removeData, getData } = require("../services/data");
const pagination = require("../utils/pagination");

let companies = [];
getData("/empresas").then((res) => (companies = res));

module.exports = {
    Query: {
        companies(obj, args) {
            const getPage = pagination(companies, args.page, 5);
            return getPage;
          }
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
      }
}