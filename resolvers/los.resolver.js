const { newData, updateData, removeData, getData } = require("../services/data");
const pagination = require("../utils/pagination");
const filterTasks = require("../utils/filterTasks");

let los = [];
getData("/lo").then((res) => (los = res));

module.exports = {
    Query: {
        los(_, args) {
            async function filterList() {
                const filter = await filterTasks(los, args);
                return pagination(filter, args.page, 5);
            }
            return filterList();
        }
    },
    Mutation: {
        newLo(_, args){
            return newData("/lo", args)
        },
        updateLo(_, args){
            return updateData("/lo", args)
        },
        removeLo(_, args){
            return removeData("/lo", args)
        }
    }
}
