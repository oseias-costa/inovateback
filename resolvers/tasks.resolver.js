const { newData, updateData, removeData, getData } = require("../services/data");
const pagination = require("../utils/pagination");
const filterTasks = require("../utils/filterTasks");

let tasks = [];
getData("/atividades").then((res) => {
  console.log(res.length / 5);
  tasks = res;
});

module.exports = {
  Query: {
    tasks(_, args) {
        async function filterList() {
            const filter = await filterTasks(tasks, args);
            return pagination(filter, args.page, 5);
        }
        return filterList();
    }
},
  Mutation: {
    newTask(_, args){
        return newData("/atividades", args)
    },
    updateTask(_, args){
        return updateData("/atividades", args)
    },
    removeTask(_, args){
        return removeData("/atividades", args)
    }
}
}